from app.models import db, Conversation, Topic
from datetime import datetime
from faker import Faker
from .random_seed import get_random_name

fake = Faker()

def random_user(cur):
  random = cur
  while random is cur:
    random = fake.random_int(min=1, max=25)
  return random

# Adds a demo user, you can add other users here if you want
def seed_conversations():

    for i in range(1, 25):
      topic = Topic.query.get(i)
      author = topic.author_id
      for j in range(1, fake.random_int(min=1, max=10)):
        responder = random_user(author)
        random_complete = fake.random_int(min=1, max=6) == 6
        conversation = Conversation(topic_id=i, responder_id=responder, is_public=random_complete,
                                    is_closed=random_complete, responder_nickname=get_random_name())

        db.session.add(conversation)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_conversations():
    db.session.execute('TRUNCATE conversations RESTART IDENTITY CASCADE;')
    db.session.commit()
