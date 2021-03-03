from .db import db
from .user_sticker import user_stickers


class Sticker(db.Model):

    __tablename__ = 'stickers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    path = db.Column(db.Text, nullable=False)

    users = db.relationship(
        'User', secondary=user_stickers, back_populates='stickers')

    # def to_dict(self):
    #     return {
    #       "id": self.id,
    #     }
