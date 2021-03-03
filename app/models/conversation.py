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

    # def to_dict(self):
    #     return {
    #       "id": self.id,
    #     }
