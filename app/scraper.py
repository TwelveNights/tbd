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
            seen_keys = []
            seen_vals = []
            for tag in sku_table.descendants:
                if not tag or tag in seen_tags:
                    continue
                if isinstance(tag, NavigableString) or len(tag.contents) != 2:
                    continue

                seen_tags.append(tag)
                if tag.descendents:
                    seen_tags += tag.descendentss
                    # for child_tag in tag.descendents:
                    #     seen_tags.append(child_tag)

                key = tag.contents[0].string
                val = tag.contents[1]

                if len(val.contents) > 1:
                    val_contents = []
                    for subkey in val.contents:
                        val_contents.append(subkey.string)
                    val = val_contents
                else:
                    val = val.string
                if key not in [None, "", 'null', 'Null', 'NULL', 'VOID', 'void', 'None', "none"]:
                    if (val not in seen_vals) and (val not in seen_keys) \
                            and (key not in seen_vals) and (key not in seen_keys):
                        seen_keys.append(key)
                        seen_vals.append(val)
                        print("appending ", key, val)
                        features.append({key: val})

            # trs = sku_table.find_all('tr')
            # if trs:
            #     for tr in trs:
            #         tds = tr.find_all('td')
            #         key = tds[0].span.string
            #         val = tds[1].span.string
            #         features.append({key: val})

            product_dict['specifications'] = features

            return product_dict
        except AttributeError as e:
            print(e)
            raise exceptions.ParseError("No specifications found")


test_url = "https://www.microsoftstore.com/store/msusa/en_US/pdp/Surface-Book/productID.5072642200"
