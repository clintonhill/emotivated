from werkzeug.security import generate_password_hash
from app.models import db, User
from datetime import datetime
from faker import Faker

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', joined_date=datetime.now(), kudos=1,
                last_active=datetime.now(), sticker_id=1,
                profile_blurb='I am the demo user of the application.')

    db.session.add(demo)

    fake = Faker()

    for i in range(50):
        user = User(username=fake.user_name(), email=fake.ascii_free_email(), password='password11235',
                    joined_date=datetime.now(), sticker_id=fake.random_int(min=1, max=2000, step=1), profile_blurb=fake.paragraph(), kudos=fake.random_int(min=0, max=500, step=1))
        db.session.add(user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
