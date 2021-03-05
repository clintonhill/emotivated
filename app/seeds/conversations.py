from app.models import db, Conversation
from datetime import datetime
from faker import Faker

fake = Faker()

def random_user(cur):
  random = cur
  while random is cur:
    random = fake.random_int(min=1, max=50)
  return random

# Adds a demo user, you can add other users here if you want
def seed_conversations():

    for i in range(50):
        for i in range(fake.random_int(min=1, max=10)):
          conversation = Conversation(topic_id=fake.random_int(min=1, max=75),
                                      responder_id=random_user(i), is_public=False, is_closed=False,
                                      responder_nickname=fake.color_name() + ' ' + fake.job())
          db.session.add(conversation)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_conversations():
    db.session.execute('TRUNCATE conversations CASCADE;')
    db.session.commit()
