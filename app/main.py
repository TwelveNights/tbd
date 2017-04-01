from flask_api import FlaskAPI, exceptions
from flask import request
from app.db import *
import scraper

app = FlaskAPI(__name__)


@app.route('/parse', methods=['GET', 'POST'])
def parse():
    data = request.data
    if "urls" not in data:
        raise exceptions.ParseError("'urls' key is missing")

    if isinstance(data["urls"], list):
        if len(data["urls"]) == 0:
            raise exceptions.ParseError("No element in the list")
        else:
            for i in data["urls"]:
                if not isinstance(i, str):
                    raise exceptions.ParseError("One of your elements is not a string")
                else:
                    result = {}
                    scraper.ProductPage(i, lambda url, html: scraper.scrape(result, url, html)).crawl()
    else:
        raise exceptions.ParseError("Enter list of urls")

    return {
        'message': result
    }

@app.route('/products', methods=['GET', 'POST', 'PUT', 'DELETE'])
def do_something_with_product():
    if request.method == "GET":
        data = get_all({})
        return [datum for datum in data]
    elif request.method == "POST":
        return add_one(request.data)
    elif request.method == "PUT":
        if request is not None:
            data = request.data
            item_id = data["_id"]
            del data["_id"]
            return update(item_id, data)
        return exceptions.APIException("Bad request")
    elif request.method == "DELETE":
        data = request.data
        item_id = data["_id"]
        return db.remove_one(item_id)






"""
{ "urls" : ["cs.ubc.ca", "google.com"] }
{"urls" : []}
{ "name" : "umbreon", "specifications" : "dark" }
{ "name" : "espeon", "specifications" : "light" }
"""

if __name__ == '__main__':
    app.run(debug=True)
