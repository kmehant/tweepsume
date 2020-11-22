
""" Server for tweepsume service """

from flask import request, jsonify, Response
import json

from initializer import server, cache, _handler

import os

@server.route('/v1/<id>', methods=['GET'])
@cache.cached(timeout=700)
def consume_api(id):
    state = _handler.analyze(id)
    if not state:
        return Response(response=json.dumps("Sorry! It didnt Work"), status=404)
    return Response(response=json.dumps(state), status=200)


if __name__ == '__main__':
    server.run(debug=True, host='0.0.0.0', port=int(
        os.environ.get('PORT', 8080)), threaded=True)
