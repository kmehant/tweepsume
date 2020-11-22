
"""Initialize Server"""

from flask import Flask
from flask_caching import Cache
from constants import cache_config, consumer_key, consumer_secret, access_token, acess_token_secret, MLapikey, MLurl
from handler import Handler
from flask_cors import CORS

server = Flask(__name__)

cors = CORS(server, resources={r"/*": {"origins": "*"}})


server.config["CACHE_TYPE"] = "simple"

cache = Cache(server, cache_config)

_handler = Handler(consumer_key, consumer_secret, access_token, acess_token_secret, MLapikey, MLurl)
