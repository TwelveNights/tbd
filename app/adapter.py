def adapter(data):
    products = []
    for entry in data:
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

        specs = []

        for spec in entry['specifications']:
            spec['definition'] = ''
            specs.append(spec)

        product['overview']['specifications'] = specs
        products.append(product)

    return products
