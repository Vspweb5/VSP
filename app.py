from flask import Flask, render_template
from config import Config
from pyrebase import pyrebase

########## Flask Init #################
app = Flask(__name__)

app.config.from_object(Config)
#######################################

######################## Firebase ####################################
firebaseConfig = {
    'apiKey': "AIzaSyCV5Ve41CZI5b2j9dexFqQjwH9pdvur5KY",
    'authDomain': "vsp-web.firebaseapp.com",
    'databaseURL': "https://vsp-web-default-rtdb.firebaseio.com/",
    'projectId': "vsp-web",
    'storageBucket': "vsp-web.appspot.com",
    'messagingSenderId': "76950228191",
    'appId': "1:76950228191:web:c83ad1d27d8c333961ed6a",
    'measurementId': "G-FH6MYLQEC4"
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()
#######################################################################


@app.route('/')
def index():
    return render_template('index.html')
    # return 'Hello World'


@app.route('/vid')
def videos(method=['GET', 'POST']):
    return render_template('videos.html')


@app.route('/in')
def login(method=['GET', 'POST']):
    pass


@app.route('/login')
def loginPage():
    return render_template('login.html')


@app.route('/up')
def signup(method=['GET', 'POST']):
    pass


@app.route('/signup')
def signupPage():
    return render_template('signup.html')


# main driver function
if __name__ == '__main__':
    app.run(port=5000, debug=True)
