from flask_api import FlaskAPI, exceptions
from flask import request

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
        raise exceptions.ParseError("Enter list of urls")

    return {
        'message': str(data)
    }


"""
{ "urls" : ["cs.ubc.ca", "google.com"] }
{"urls" : []}

"""

if __name__ == '__main__':
    app.run(debug=True)
