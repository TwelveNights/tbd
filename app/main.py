from flask_api import FlaskAPI, exceptions
from flask import request
import db
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

@app.route('/product', methods=['GET', 'PUT'])
def get_collection():
    if request.method == "GET":
        data = db.get_all({})
        return [datum for datum in data]

if __name__ == '__main__':
    app.run(debug=True)
