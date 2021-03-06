from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Sticker

sticker_routes = Blueprint('stickers', __name__)


@sticker_routes.route('/')
@login_required
def stickers():
    stickers = Sticker.query.all()
    return {"stickers": [sticker.to_dict() for sticker in stickers]}
