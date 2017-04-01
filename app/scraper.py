from bs4 import BeautifulSoup, SoupStrainer
from page_renderer import PageRenderer

class ProductPage:
    def __init__(self, url, cb):
        self.url = url
        self.pageRenderer = PageRenderer(cb)

    def crawl(self):
        self.pageRenderer.crawl(self.url)

def scrape(result, url, html):
    soup = BeautifulSoup(html, 'html.parser')
    product_dict = {}
    product_dict['name'] = soup.find('h1').string

    sku_table = soup.find('div', class_='cli_sku-variation')

    features_list = []
    for tr in sku_table.find_all('tr'):
        tds = tr.find_all('td')
        key = tds[0].span.string
        val = tds[1].span.string
        features_list.append((key, val))

    product_dict['specifications'] = features_list

    result['data'] = product_dict
