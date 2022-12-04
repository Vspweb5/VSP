from flask import Flask, render_template, request, redirect, session
from flask_session import Session
from flask_socketio import SocketIO
from datetime import timedelta
from config import Config
from pyrebase import pyrebase

########## Flask Init #################
app = Flask(__name__)

app.config.from_object(Config)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)  # If TRUE
# The maximum number of items the session stores
# before it starts deleting some, default 500
app.config['SESSION_FILE_THRESHOLD'] = 500
Session(app)
socketio = SocketIO(app)
#######################################

######################## Firebase ####################################
firebaseConfig = {
    'apiKey': "AIzaSyCV5Ve41CZI5b2j9dexFqQjwH9pdvur5KY",
    'authDomain': "vsp-web.firebaseapp.com",
    'projectId': "vsp-web",
    'storageBucket': "vsp-web.appspot.com",
    'messagingSenderId': "76950228191",
    'appId': "1:76950228191:web:c83ad1d27d8c333961ed6a",
    'databaseURL': "https://vsp-web-default-rtdb.firebaseio.com/",
    'measurementId': "G-FH6MYLQEC4"
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()
#######################################################################


def check():
    try:
        if session["username"] == None:
            session["username"] = "null"
    except KeyError:
        session["username"] = "null"


@app.route('/')
def index():
    # try:
    #     if session["username"] == None:
    #         session["username"] = "null"
    # except KeyError:
    #     session["username"] = "null"
    check()
    return render_template('index.html', username=session["username"])


@app.route('/about')
def about():
    check()
    return render_template('about.html', username=session["username"])


@app.route('/contact')
def contact():
    check()
    return render_template('contact.html', username=session["username"])


@app.route('/upload', methods=["GET", "POST"])
def upload():
    if session["username"] == "null" or session["username"] == None:
        return redirect('/login')
    return render_template('upload.html', username=session["username"])


@app.route('/watch', methods=["GET", "POST"])
def vid():
    check()
    if request.method == "GET":
        # print(request.args.get('v'))
        # url = request.args.get('v')
        # if '-' in url:
        #     url = "https://firebasestorage.googleapis.com/v0/b/vsp-web.appspot.com/o/videos%2F" + \
        #         url + ".mp4?alt=media"
        #     return render_template('watch.html', username=session["username"], url=url, dis='none', vid='block')
        # else:
        #     url = url
        #     return render_template('watch.html', username=session["username"], url=url, dis='block', vid='none')
        key = request.args.get('v')
        return render_template('watch.html', username=session["username"], key=key)
    redirect('/videos')
    # return render_template('watch.html', username=session["username"])


@app.route('/videos')
def videos():
    check()
    return render_template('videos.html', username=session["username"])


@socketio.on('disconnect')
@app.route('/logout')
def logout():
    session.pop("username", None)
    # session["username"] = "null"
    # session["email"] = "null"
    return redirect('/')


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        # session["email"] = email
        key = email.split('@')[0]
        password = request.form.get("password")
        try:
            auth.sign_in_with_email_and_password(email, password)
            data = db.child('users').child(key).get()
            username = data.val()['name']
            session["username"] = username
            return redirect("/")
        except Exception as e:
            print("\n")
            print(e)
            print("\n")
            return f"""
                    Error Happend! (@TEM)<br />
                    <hr />
                    <code>{e}</code>
                    <hr />
                    Kindly email above error to vsp.web5@gmail.com
                    """
    return render_template('login.html')


@app.route('/signup', methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form.get("email")
        username = email.split('@')[0]
        password = request.form.get("password")
        data = {
            'name': username,
            'email': email,
            'password': password
        }
        try:
            auth.create_user_with_email_and_password(email, password)
            db.child('users').child(email.split('@')[0]).set(data)
            return render_template('login.html', email=email, password=password)
        except Exception as e:
            print("\n")
            print(e)
            print("\n")
            return f"""
                    Error Happend! (@TEM) <br />
                    Check If the email is already sign up. <br />
                    Else it is internal server error it will get repaired soon.<br />
                    <hr />
                    <code>{e}</code>
                    <hr />
                    Kindly email above error to vsp.web5@gmail.com
            """
    return render_template('signup.html')


# main driver function
if __name__ == '__main__':
    app.run(port=5000, debug=True)
