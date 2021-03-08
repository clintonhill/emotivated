from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Conversation, Message

conversation_routes = Blueprint('conversations', __name__)


@conversation_routes.route('/users/<int:id>')
@login_required
def getConversations(id):
    conversations = Conversation.query.filter_by(responder_id=id).all()
    return {"conversations": [conversation.to_dict() for conversation in conversations]}

@conversation_routes.route('/<int:id>')
@login_required
def getMessages(id):
    messages = Message.query.filter_by(conversation_id=id).all()
    return {id: [message.to_dict() for message in messages]}
