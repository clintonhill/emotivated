from .db import db


user_stickers = db.Table('user_stickers',
                db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
                db.Column('sticker_id', db.Integer, db.ForeignKey('stickers.id'), primary_key=True)
                )
