import pymongo as pm
from pymongo import ReturnDocument

client = pm.MongoClient()
db = client['product_db']
products = db['products']

def add_one(request):
    result = products.insert_one(request)
    item_id = result.inserted_id
    product = products.find_one({'_id': item_id})
    product['_id'] = str(product['_id'])
    return product

def get_one(id):
    product = products.find_one({'_id': id})
    return product

def remove_one(id):
    deletedItem = products.find_one_and_delete({'_id': id})
    return deletedItem

def remove_all(request):
    products.delete_many(request)

def add_all(products):
    products.insert_many(products)

def get_all(request):
    cursor = products.find(request)
    return cursor

def update(id, request):
    return products.find_one_and_replace({'_id': id}, request, return_document=ReturnDocument.AFTER)
