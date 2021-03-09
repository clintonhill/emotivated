from app.models import db, Topic
from datetime import datetime
from faker import Faker
from .random_seed import get_random_name

# Adds a demo user, you can add other users here if you want
def seed_topics():

    fake = Faker()

    for i in range(1, 25):
        # user = User(username=fake.user_name(), email=fake.ascii_free_email(), password='password11235',
        #             joined_date=datetime.now(), sticker_id=fake.random_int(min=1, max=2000, step=1), profile_blurb=fake.paragraph(), kudos=fake.random_int(min=0, max=500, step=1))
        topic = Topic(name='[Topic] '+fake.text(max_nb_chars=200), description='[Description] '+fake.paragraph(), author_id=fake.random_int(min=1, max=25),
                      date_added=fake.date_between(start_date='-30d', end_date='today'), is_resolved=False, author_nickname=get_random_name())
        db.session.add(topic)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_topics():
    db.session.execute('TRUNCATE topics RESTART IDENTITY CASCADE;')
    db.session.commit()
