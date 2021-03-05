from app.models import db, Message
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

    for i in range(50):
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
    db.session.execute('TRUNCATE messages CASCADE;')
    db.session.commit()
