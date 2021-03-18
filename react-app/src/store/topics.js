const SET_ONE_TOPIC = 'topics/SET_ONE_TOPIC'
const SET_TOPICS = 'topics/SET_TOPICS'

export const setTopic = (topic) => {
  return {
      type: SET_ONE_TOPIC,
      payload: topic
  }
}

export const setTopics = (topics) => {
  return {
    type: SET_TOPICS,
    payload: topics
  }
}

export const getTopicsPage = (page) => async dispatch => {
  const response = await fetch(`/api/topics/page/${page}`)
  if(response.ok) {
    const topics = await response.json();
    dispatch(setTopics(topics))
    console.log(topics)
  }
}

export const getOneTopic = () => async dispatch => {
  const response = await fetch('/api/topics/random')
  if(response.ok) {
    const topic = await response.json();
    dispatch(setTopic(topic))
    return topic.id;
  }
}

export const postOneTopic = postPayload => async dispatch => {
  const opts = {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postPayload)
  }
  const response = await fetch(`/api/topics`, opts)
  if(response.ok) {
    const topic = await response.json();
    dispatch(setTopic(topic))
    return topic.id;
  }
}

const topicReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type){
      case SET_ONE_TOPIC:
          newState[action.payload.id] = action.payload;
          return newState;
      case SET_TOPICS:
        for(let topic of action.payload['topics']) {
          newState[topic.id] = topic
        }
        return newState;
      default:
        return state;
  }
}

export default topicReducer
