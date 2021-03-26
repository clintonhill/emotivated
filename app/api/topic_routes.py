from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Topic, db, Conversation
from app.forms import NewTopicForm
from sqlalchemy.sql.expression import func, select

topic_routes = Blueprint('topics', __name__)

      # name: topic,
      # description: description,
      # author_id: user,
      # author_nickname: nickname

@topic_routes.route('', methods=['POST'])
@login_required
def postTopic():
  form = NewTopicForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    topic = Topic(
      name=form.data['name'],
      description=form.data['description'],
      author_id=form.data['author_id'],
      author_nickname=form.data['author_nickname']
    )

    db.session.add(topic)
    db.session.commit()

    return topic.to_dict(current_user)

  return {"errors": "Error!"}, 400


@topic_routes.route('/page/<int:page>')
def getTopicsPage(page):
  topics = Topic.query.paginate(page, 10, False)
  items = topics.items
  return {"topics": [topic.to_published_dict() for topic in items]}


@topic_routes.route('/random')
def getRandomTopic():
  rand = db.session.query(Topic).order_by(func.random()).first()
  count = Conversation.query.filter(Conversation.topic_id == rand.id).count()
  return rand.to_dict(current_user, count)
