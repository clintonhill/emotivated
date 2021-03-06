from .db import db
from datetime import datetime


class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.now())
    is_edited = db.Column(db.Boolean, default=False)

    sender = db.relationship('User')
    conversation = db.relationship('Conversation')

    def to_dict(self, current_user):
        return {
            "id": self.id,
            "message": self.message,
            "conversation_id": self.conversation_id,
            "timestamp": self.timestamp,
            "is_edited": self.is_edited,
            "current_is_author": current_user.id == self.sender_id
        }

    def to_published_dict(self):
        return {
            "id": self.id,
            "message": self.message,
            "conversation_id": self.conversation_id,
            "timestamp": self.timestamp,
            "is_edited": self.is_edited,
            "from_topic_author": self.conversation.responder_id == self.sender_id
        }
