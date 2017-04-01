import pymongo as pm
from pymongo import ReturnDocument

client = pm.MongoClient()
db = client['product_db']
products = db['products']

def add_one(request):
    product = products.insert_one(request)
    return product

def get_one(id):
    product = products.find_one({'_id': id})
    return product

def remove_one(id):
    products.find_one_and_delete({'_id': id})

def remove_all(request):
    products.delete_many(request)

def add_all(products):
    products.insert_many(products)

def get_all(request):
    cursor = products.find(request)
    return cursor

def update(id, request):
    products.find_one_and_replace({'_id': id}, request, return_document=ReturnDocument.AFTER)
