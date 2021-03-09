const SET_CONVERSATIONS = 'conversations/SET_CONVERSATIONS'
const SET_ONE_CONVERSATION = 'conversations/SET_ONE_CONVERSATION'

export const setConversations = (users) => {
  return {
      type: SET_CONVERSATIONS,
      payload: users
  }
}

const setOneConversation = (conversation) => {
  return {
    type: SET_ONE_CONVERSATION,
    payload: conversation
  }
}

export const getConversationMessages = conversationId => async dispatch => {
  const response = await fetch(`/api/conversations/${conversationId}`)
  console.log()
  if(response.ok) {
    const conversation = await response.json();
    dispatch(setOneConversation(conversation))
  }
}

export const getChatPartners = userId => async (dispatch) => {
  const response = await fetch(`/api/conversations/users/${userId}`)
  if(response.ok) {
      const users = await response.json();
      dispatch(setConversations(users));
  }
}

const conversationReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type){
      case SET_CONVERSATIONS:
          newState = {...newState, ...action.payload}
          return newState;
      case SET_ONE_CONVERSATION:
        if(!newState.messages) newState.messages = {}
        newState.messages = {...newState.messages, ...action.payload };
        return newState;
      default:
        return state;
  }
}

export default conversationReducer
