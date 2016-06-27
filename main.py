from flask import Flask, request
from flask import send_from_directory
import os

app = Flask(__name__, static_url_path='/../')


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    return app.send_static_file(filename)


if __name__ == '__main__':
    app.run(port=8000)

