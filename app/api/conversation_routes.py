from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Conversation, Message, Topic, db
from sqlalchemy import or_

conversation_routes = Blueprint('conversations', __name__)


@conversation_routes.route('/users/<int:id>')
@login_required
def getConversations(id):
    # conversations = db.session.query(Conversation).join(Topic).filter(or_(Conversation.responder_id==id, Topic.author_id==id)).all()
    conversations = db.session.query(Conversation).join(Topic).filter((Conversation.responder_id==id) | (Topic.author_id==id)).all()
    return {"conversations": [conversation.to_dict(current_user) for conversation in conversations]}

@conversation_routes.route('/<int:id>')
@login_required
def getMessages(id):
    messages = Message.query.filter_by(conversation_id=id).all()
    return {id: [message.to_dict(current_user) for message in messages]}
