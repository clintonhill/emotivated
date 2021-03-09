const SET_ONE_TOPIC = 'topics/SET_ONE_TOPIC'

export const setTopic = (topic) => {
  return {
      type: SET_ONE_TOPIC,
      payload: topic
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
  }
}

const topicReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type){
      case SET_ONE_TOPIC:
          newState = {...newState, ...action.payload}
          return newState;
      default:
        return state;
  }
}

export default topicReducer
