from werkzeug.security import generate_password_hash
from app.models import db, User, Sticker
from datetime import datetime
from faker import Faker
import random

# Adds a demo user, you can add other users here if you want
def seed_users():

    stickers_count = Sticker.query.count()

    demo = User(username='Demo', email='demo@aa.io',
                password='password', joined_date=datetime.now(), kudos=1,
                last_active=datetime.now(), sticker_id=1,
                profile_blurb='I am the demo user of the application.')


    nums = random.sample(range(1, stickers_count), 45)
    for j in nums:
        sticker = Sticker.query.get(j)
        demo.stickers.append(sticker)

    db.session.add(demo)

    fake = Faker()

    # stickers = Sticker.query.limit(5).all()
    # print(stickers)

    for i in range(25):
        user = User(username=fake.user_name(), email=fake.ascii_free_email(), password='password11235',
                    joined_date=datetime.now(), sticker_id=fake.random_int(min=1, max=stickers_count), profile_blurb=fake.paragraph(), kudos=fake.random_int(min=0, max=500, step=1))
        num_stickers = fake.random_int(min=1, max=20)
        nums = random.sample(range(1, stickers_count), num_stickers)
        for j in nums:
            sticker = Sticker.query.get(j)
            user.stickers.append(sticker)
        db.session.add(user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
