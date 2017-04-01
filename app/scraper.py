from flask_api import exceptions
import dryscrape
from bs4 import BeautifulSoup

class SimpleScraper:
    def __init__(self):
        pass

    def check_tag(self, tag):
        return 'spec' in tag.id.lower() or 'spec' in tag.class_.lower()

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

            sku_table = soup.find('div', class_='cli_sku-variation')

            features = []
            for tr in sku_table.find_all('tr'):
                tds = tr.find_all('td')
                key = tds[0].span.string
                val = tds[1].span.string
                features.append({key: val})

            product_dict['specifications'] = features

            return product_dict
        except AttributeError as e:
            print(e)
            raise exceptions.ParseError("No specifications found")


if __name__ == '__main__':
    