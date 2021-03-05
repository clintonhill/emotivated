from app.models import db, Sticker

# Adds a demo user, you can add other users here if you want
def seed_stickers():

    demo = Sticker(name='sticker_1', path='sticker_1_path')

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_stickers():
    db.session.execute('TRUNCATE stickers CASCADE;')
    db.session.commit()
