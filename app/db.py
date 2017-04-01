import pymongo as pm
from pymongo import *

client = pm.MongoClient()
db = client['product_db']
products = db['products']


def add_one(request):

    result = products.insert_one(request)
    item_id = result.inserted_id
    product = products.find_one({'_id': item_id})
    product['_id'] = product['_id'].toString()
    return product


def get_one(id):
    product = find_instance(id)
    return product


def remove_one(id):
    item = find_instance(id)

    if item is not None:
        objid = item['_id']
        deleted_item = products.find_one_and_delete({'_id': objid})
        return deleted_item

    return None


def remove_all(request):
    products.delete_many(request)


def add_all(products):
    products.insert_many(products)


def get_all(request):
    cursor = products.find(request)
    return cursor


def update(id, request):
    item = find_instance(id)

    if item is not None:
        objid = item['_id']
        return products.find_one_and_replace({'_id': objid}, request, return_document=ReturnDocument.AFTER)

    return None

def find_instance(id):
    cursor = products.find({})

    for item in cursor:
        if str(item['_id']) == str(id):
            return item
    return None

