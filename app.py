from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
    # return 'Hello World'


@app.route('/vid')
def videos(method=['GET', 'POST']):
    return render_template('videos.html')


# main driver function
if __name__ == '__main__':
    app.run(port=5000, debug=True)
