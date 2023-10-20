from flask import Flask, request, json
from flask_cors import CORS
        
from collections import defaultdict
import re

## from utils import 
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return json_response({'hello': 'world'})

@app.route("/words", methods = ['POST', 'GET'])
# create a post method that receives a txt file and returns the most common english words
def get_words():
    if request.method == 'POST':
        #read file from request
        with open("1-1000.txt") as f:
            common_words = set(list(f.readlines())[:101])
        f = request.files['file']
        all_words = re.split(r"\W+", f.read().lower().decode("utf-8"))
        words = [
            word for word in all_words 
            if word not in common_words 
            and word
            and not any(char.isdigit() for char in word) 
            and word != "_i_"
        ]

        def is_number(s):
            try:
                float(s)
                return True
            except ValueError:
                return False

        freq = defaultdict(int)
        for word in words:
            freq[word] += 1

    freq = dict(sorted(freq.items()))
    return json_response(freq)

    
def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})