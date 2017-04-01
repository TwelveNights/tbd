import pymongo as pm
from pymongo import ReturnDocument
from pprint import pprint

client = pm.MongoClient()
db = client['product_db']
appleProducts = db['apple']

def add_one(request):
    product = appleProducts.insert_one(request)
    return product.inserted_id

def get_one(request):
    product = appleProducts.find_one(request)
    pprint(product)

def remove_one(id):
    appleProducts.delete_one(id)

def remove_all(request):
    appleProducts.delete_many(request)

def add_all(products):
    appleProducts.insert_many(products)

def get_all(request):
    products = appleProducts.find(request)
    for product in products:
        pprint(product)

def update(id, request):
    pprint(appleProducts.find_one_and_replace({'_id': id}, request, return_document=ReturnDocument.AFTER))
