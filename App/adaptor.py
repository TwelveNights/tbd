import pymongo as pm
from pymongo import *
import collections

def adaptor():

    client = pm.MongoClient()
    db = client['product_db']
    product_collection = db['products']

    products = []
    specs = []

    cursor = product_collection.find({})

    for entry in cursor:

        product = {
            "overview": {
                "brand": {
                    "publisher": "",
                    "label": "",
                    "vendor": ""
                    },
                    "names": {
                      "short": ""
                    },
                    "parentCategory": {
                      "displayName": "",
                      "categoryId": ""
                    },
                    "manufacturerId": {
                      "modelNumber": ""
                    },
                    "productId": "",
                    "productType": "",
                    "skuId": "",
                    "color": {
                      "displayName": ""
                    },
                    "features": [],
                    "includedItems": [],
                    "specifications": []
                  }
        }
        product['overview']['names']['short'] = entry['name']

        for spec in entry['specifications']:
            spec['definition'] = ''
            specs.append(spec)

        product['specifications'] = specs

        products.append(product)

    print(str(products))
    return products
