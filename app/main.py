from flask.ext.api import FlaskAPI, exceptions
from flask import request

app = FlaskAPI(__name__)


@app.route('/parse/', methods=['GET', 'POST'])
def parse():
    data = request.data
    if "urls" not in data:
        raise exceptions.APIException("Bad request")

    # for entry, i in enumerate(request.data):
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
