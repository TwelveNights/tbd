from flask_api import exceptions
import dryscrape
from bs4 import BeautifulSoup, NavigableString

class SimpleScraper:
    def __init__(self):
        pass

    def check_tag(self, tag):
        if tag.name not in ['div', 'section', 'table', 'tr', 'td', 'ul', 'li']:
            return False

        ids = tag.get('id')
        classes = tag.get('class')
        if ids:
            if isinstance(ids, str): ids = [ids]
            for id in ids:
                if 'spec' in id.lower():
                    return True
        if classes:
            if isinstance(classes, str):  classes = [classes]
            for class_ in classes:
                if 'spec' in class_.lower():
                    return True
        return False

    def reject_duplicates(self, key, val, seen_list):
        for entry in seen_list:
            if key in entry or val in entry:
                return True

        return False


    def scrape(self, url):
        if url.startswith("https://") or url.startswith("http://"):
            pass
        else:
            url = "http://" + url
        session = dryscrape.Session()
        session.visit(url)
        response = session.body()

        soup = BeautifulSoup(response, 'html.parser')
        product_dict = {}
        try:
            product_dict['name'] = soup.find('h1').string

            # sku_table = soup.find('div', class_='cli_sku-variation')
            sku_table = soup.find(self.check_tag)

            features = []
            seen_tags = []
            for tag in sku_table.descendants:
                if not tag or tag in seen_tags:
                    continue
                if isinstance(tag, NavigableString) or len(tag.contents) != 2:
                    continue

                seen_tags.append(tag)
                if tag.descendents:
                    seen_tags += tag.descendentss

                key = tag.contents[0].string
                val = tag.contents[1].prettify()
                val_lines = val.split('\n')
                stripped_val = []
                for line in val_lines:
                    if '<' not in line:
                        stripped_val.append(line.strip())
                val = " | "
                val = val.join(stripped_val)

                if key not in [None, "", 'null', 'Null', 'NULL', 'VOID', 'void', 'None', "none"]:
                    if not self.reject_duplicates(key, val, seen_tags):
                        seen_tags.append(val)
                        seen_tags.append(key)
                        print("appending ", key, ": ", val)
                        features.append({key: val})


            product_dict['specifications'] = features

            return product_dict
        except AttributeError as e:
            print(e)
            raise exceptions.ParseError("No specifications found")


test_url = "https://www.microsoftstore.com/store/msusa/en_US/pdp/Surface-Book/productID.5072642200"
