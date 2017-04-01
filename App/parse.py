from .db import *
from .product import *

def parse(obj):

    product_detail = ProductDetail('iPhone7')

    product_detail.add_spec({'displayName': 'Color', 'Value': 'Red'})
    product_detail.add_spec({'displayName': 'Capacity', 'Value': '132 GB'})

    #for item in obj['spces']:
    #    spec = Specification(item['name'], item['value'])
    #    product_detail.add_spec(spec)
    #
    product = add_one(product_detail.to_dict())

    return product

