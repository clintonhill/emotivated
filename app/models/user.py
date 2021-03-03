from .db import db
from .user_sticker import user_stickers
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


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
