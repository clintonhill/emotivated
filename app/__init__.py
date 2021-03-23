import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit

import json

from .models import db, User, Conversation, Message
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.stickers_routes import sticker_routes
from .api.conversation_routes import conversation_routes
from .api.topic_routes import topic_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(sticker_routes, url_prefix='/api/stickers')
app.register_blueprint(conversation_routes, url_prefix='/api/conversations')
app.register_blueprint(topic_routes, url_prefix='/api/topics')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

socketio = SocketIO(app, cors_allowed_origins='*')
# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........

# SocketIO implementation

users = {}

def get_other_user(conversation_id, user_id):
    conversation = Conversation.query.get(conversation_id)
    if conversation.responder_id == user_id:
        other_user = conversation.topic.author_id
    else:
        other_user = conversation.responder_id

    return other_user

@socketio.on('client_message')
def handle_message(data):
    data = json.loads(data)
    content, from_id, conversation_id = data.values()

    message = Message(message=content, sender_id=from_id,
                      conversation_id=conversation_id)
    db.session.add(message)
    db.session.commit()

    other_user = get_other_user(conversation_id, from_id)

    if other_user in users:
        emit('message', {"msg": content, "conversation_id":conversation_id, "is_author": False }, room=users[other_user])

    if from_id not in users or users[from_id] != request.sid:
        users[from_id] = request.sid

    emit('message', {"msg": content, "conversation_id":conversation_id, "is_author": True}, room=users[from_id])


@socketio.on('reward')
def reward_user(data):
    data = json.loads(data)
    user_from, conversation_id = data.values()
    other_user = get_other_user(conversation_id, user_from)

    user = User.query.get(other_user)
    user.kudos += 1
    user.add_stickers(1)
    db.session.add(user)
    db.session.commit()

@socketio.on('connection')
def handle_connect(data):
    user_id = data
    if user_id not in users or users[user_id] != request.sid:
        users[user_id] = request.sid
        emit('connection_event', users[user_id], broadcast=True)

if(__name__ == '__main__'):
    socketio.run(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
