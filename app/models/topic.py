from .db import db
from datetime import datetime


class Topic(db.Model):

    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.now())
    is_resolved = db.Column(db.Boolean, default=False)
    author_nickname = db.Column(db.String(200), nullable=False)

    author = db.relationship('User')

    # def to_dict(self):
    #     return {
    #       "id": self.id,
    #     }
