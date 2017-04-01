from flask.ext.api import FlaskAPI, exceptions
from flask import request
from app.db import *

app = FlaskAPI(__name__)

@app.route('/parse', methods=['GET', 'POST'])
def parse():
    data = request.data
    if "urls" not in data:
        raise exceptions.APIException("'urls' key is missing")

    if isinstance(data["urls"], list):
        if len(data["urls"]) == 0:
            raise exceptions.APIException("No element in the list")
        else:
            for i in data["urls"]:
                if not isinstance(i, str):
                    raise exceptions.APIException("One of your elements is not a string")
    else:
        raise exceptions.APIException("Enter list of urls")
    #    if (request.data[i] != None):
    #         raise exceptions.NotFound()
    #    else:
    #         pass1

    return {
        'message': str("Hello")
    }

@app.route('/products', methods=['GET', 'DELETE'])
def get_collection():
    if request.method == "GET":
        data = db.get_all({})
        return [datum for datum in data]

    if request.method == "DELETE":
        temp = db.get_all({})
        data = [datum for datum in temp]
        for i in data:
            if i.get(['_id']) == id:
                return db.remove_one(id)
"""
{ "urls" : ["cs.ubc.ca", "google.com"] }
{"urls" : []}

"""

if __name__ == '__main__':
    app.run(debug=True)
