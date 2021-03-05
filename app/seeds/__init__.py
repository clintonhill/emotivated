from flask.cli import AppGroup
from .users import seed_users, undo_users
from .stickers import seed_stickers, undo_stickers
from .topics import seed_topics, undo_topics

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_stickers()
    seed_users()
    seed_topics()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_stickers()
    undo_topics()
    # Add other undo functions here
