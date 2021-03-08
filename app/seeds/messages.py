from app.models import db, Message, Conversation
from datetime import datetime
from faker import Faker

fake = Faker()

def random_user(cur):
  random = cur
  while random is cur:
    random = fake.random_int(min=1, max=50)
  return random

# Adds a demo user, you can add other users here if you want
def seed_messages():

    conversation_count = Conversation.query.count()
    for i in range(1, conversation_count):
      conversation = Conversation.query.get(i)
      for j in range(1, 10):
        sender = conversation.responder_id
        if fake.random_int(min=1, max=2) == 2:
          sender = conversation.topic.author_id

        message = Message(sender_id=sender, message=fake.paragraph(), conversation_id=i,
                            timestamp=fake.date_time_between(start_date='-7d', end_date='now'), is_edited=False)
        db.session.add(message)

    for i in range(1, 50):
        for j in range(fake.random_int(min=1, max=10)):
          message = Message(sender_id=random_user(i), message=fake.paragraph(), conversation_id=fake.random_int(min=1, max=75),
                            timestamp=fake.date_time_between(start_date='-7d', end_date='now'), is_edited=False)
          db.session.add(message)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
