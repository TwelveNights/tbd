import json
from bs4 import BeautifulSoup, SoupStrainer
from page_renderer import PageRenderer


class ProductPage:
    def __init__(self, url, cb):
        self.url = url
        self.html = None
        self.dump_path = 'dump_file.html'
        self.pageRenderer = PageRenderer(cb, self.dump_path)
        self.product_dict = {}

    def scrape(self):
        self.pageRenderer.crawl(self.url)
        with open(self.dump_path, 'r', encoding='utf-8') as html_dump:
            html = html_dump.read()

        soup = BeautifulSoup(html, 'html.parser')
        product_name_long = soup.find('h1').string
        self.product_dict['name'] = product_name_long

        sku_table = soup.find('div', class_='cli_sku-variation')


        features_list = []
        for tr in sku_table.find_all('tr'):
            tds = tr.find_all('td')
            key = tds[0].span.string
            val = tds[1].span.string
            features_list.append((key, val))

        self.product_dict['specifications'] = features_list

        return json.dumps(self.product_dict, indent=4)

def cb(url, html):
    print('Got {0} bytes of HTML'.format(len(html)))
