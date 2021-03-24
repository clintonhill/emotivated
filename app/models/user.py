from .db import db
from .sticker import Sticker
from .user_sticker import user_stickers
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.sql.expression import func, select


class User(db.Model, UserMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40),nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    joined_date = db.Column(db.DateTime, nullable=False, default=datetime.now())
    kudos = db.Column(db.Integer, nullable=False, default=1)
    profile_blurb = db.Column(db.String(500))
    last_active = db.Column(db.DateTime, nullable=False, default=datetime.now())
    sticker_id = db.Column(db.Integer, db.ForeignKey('stickers.id'), nullable=False, default=1)


    stickers = db.relationship(
        'Sticker', secondary=user_stickers, back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "username": self.username,
          "email": self.email
        }

    def to_profile_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "kudos": self.kudos,
            "profile_blurb": self.profile_blurb,
            "sticker_id": self.sticker_id,
            "stickers": [sticker.to_dict() for sticker in self.stickers],
        }

    def add_stickers(self, num):
        self_stickers = [sticker.to_dict()["id"] for sticker in self.stickers]

        for i in range(num):
            rand_sticker = Sticker.query.filter(~Sticker.id.in_(self_stickers)).order_by(func.random()).first()
            self.stickers.append(rand_sticker)
