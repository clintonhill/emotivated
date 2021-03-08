from .db import db


class Conversation(db.Model):

    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    responder_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    is_public = db.Column(db.Boolean, default=False)
    is_closed = db.Column(db.Boolean, default=False)
    responder_nickname = db.Column(db.String(200), nullable=False)

    topic = db.relationship('Topic')
    responder = db.relationship('User')

    def to_dict(self, current_user):
        return {
            "id": self.id,
            "topic": self.topic.to_dict(current_user),
            "is_public": self.is_public,
            "is_closed": self.is_closed,
            "responder_nickname": self.responder_nickname,
            "current_is_author": current_user == self.responder_id
        }
