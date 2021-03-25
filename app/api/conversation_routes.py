from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Conversation, Message, Topic, db
from sqlalchemy import or_
from app.seeds.random_seed import get_random_name

conversation_routes = Blueprint('conversations', __name__)


@conversation_routes.route('/users/<int:id>')
@login_required
def getConversations(id):
    # conversations = db.session.query(Conversation).join(Topic).filter(
    # or_(Conversation.responder_id==id, Topic.author_id==id)).all()
    conversations = db.session.query(Conversation).join(Topic).filter(
        (Conversation.responder_id == id) | (Topic.author_id == id)).all()
    return {
        "conversations": {conversation.id: conversation.to_dict(current_user)
                          for conversation in conversations}}


@conversation_routes.route('/<int:id>')
@login_required
def getMessages(id):
    messages = Message.query.filter_by(conversation_id=id).all()
    return {id: [message.to_dict(current_user) for message in messages]}


@conversation_routes.route('/new/<int:topic_id>')
@login_required
def create_conversation(topic_id):
    user = current_user
    topic = Topic.query.get(topic_id)
    conversation = Conversation(
        topic_id=topic_id, responder_id=user.id,
        responder_nickname=get_random_name())
    db.session.add(conversation)
    db.session.commit()
    return conversation.to_dict(current_user)

@conversation_routes.route('/page/<int:page>')
def getPublishedPage(page):
  conversations = Conversation.query.paginate(page, 10, False)
  items = conversations.items
  return {"conversations": [conversation.to_published_dict() for conversation in items]}
