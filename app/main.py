from flask_api import FlaskAPI, exceptions, status
from flask import request
from db import *
from scraper import SimpleScraper

app = FlaskAPI(__name__)

scraper = SimpleScraper()

@app.route('/parse', methods=['GET', 'POST'])
def parse():
    data = request.data
    if "urls" not in data:
        raise exceptions.ParseError("'urls' key is missing")

    if isinstance(data["urls"], list):
        if len(data["urls"]) == 0:
            raise exceptions.ParseError("No element in the list")
        else:
            response = []
            for i in data["urls"]:
                if not isinstance(i, str):
                    raise exceptions.ParseError("One of your elements is not a string")
                else:
                    result = scraper.scrape(i)
                    result["url"] = i
                    response.append(result)
    else:
        raise exceptions.ParseError("Enter list of urls")

    return {
        'data': response
    }

@app.route('/products', methods=['GET', 'POST', 'PUT', 'DELETE'])
def do_something_with_product():
    if request.method == "GET":
        return get_all()
    elif request.method == "POST":
        return add_one(request.data)
    elif request.method == "PUT":
        if request is not None:
            data = request.data
            item_id = data["_id"]
            del data["_id"]
            return update(item_id, data)
        raise exceptions.ParseError("Bad request")
    elif request.method == "DELETE":
        if "id" not in request.data:
            raise exceptions.ParseError("No id to delete!")

        if (request.data["id"] == 0):
            remove_all()
            return {}, status.HTTP_204_NO_CONTENT

        return remove_one(request.data["id"])


"""
{ "urls" : ["cs.ubc.ca", "google.com"] }
{"urls" : []}
{ "name" : "umbreon", "specifications" : "dark" }
{ "name" : "espeon", "specifications" : "light" }
"""

if __name__ == '__main__':
    app.run(debug=True)
