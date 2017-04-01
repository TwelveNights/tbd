from .db import *
from .product import *

def parse(obj):

    productDetail = ProductDetail('product_name')
    spec1 = Specification('spec1', 'This is a awesome spec for the object')
    productDetail.add_spec(spec1)

    product = add_one(productDetail)

    return product
