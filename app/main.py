from flask.ext.api import FlaskAPI, exceptions
from flask import request

app = FlaskAPI(__name__)

@app.route('/parse/', methods=['GET', 'POST'])
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


"""
{ "urls" : ["cs.ubc.ca", "google.com"] }
{"urls" : []}

"""

if __name__ == '__main__':
    app.run(debug=True)
