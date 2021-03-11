const SET_CONVERSATIONS = 'conversations/SET_CONVERSATIONS'
const SET_ONE_CONVERSATION = 'conversations/SET_ONE_CONVERSATION'
const SET_ONE_CONVERSATION_MESSAGES = 'conversations/SET_ONE_CONVERSATION_MESSAGES'
const ADD_MESSAGE_TO_CONVERSATION = 'conversations/ADD_MESSAGE_TO_CONVERSATION'

export const setConversations = (users) => {
  return {
      type: SET_CONVERSATIONS,
      payload: users
  }
}

const setOneConversationMessages = (conversation) => {
  return {
    type: SET_ONE_CONVERSATION_MESSAGES,
    payload: conversation
  }
}

const setOneConversation = conversation => {
  return {
    type: SET_ONE_CONVERSATION,
    payload: conversation
  }
}

export const addMessageToConversation = (message) => {
  return {
    type: ADD_MESSAGE_TO_CONVERSATION,
    payload: message
  }
}

export const getConversationMessages = conversationId => async dispatch => {
  const response = await fetch(`/api/conversations/${conversationId}`)
  if(response.ok) {
    const conversation = await response.json();
    dispatch(setOneConversationMessages(conversation))
  }
}

export const getChatPartners = userId => async (dispatch) => {
  const response = await fetch(`/api/conversations/users/${userId}`)
  if(response.ok) {
      const users = await response.json();
      dispatch(setConversations(users));
  }
}

export const makeConversationConnection = (topicId) => async(dispatch) => {
  const response = await fetch(`/api/conversations/new/${topicId}`)
  if(response.ok) {
    const conversation = await response.json();
    dispatch(setOneConversation(conversation))
    return conversation.id;
  }
}

const conversationReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type){
      case SET_CONVERSATIONS:
        newState = {...newState, ...action.payload}
        return newState;
      case SET_ONE_CONVERSATION:
        if(!newState.conversations) newState.conversations = { }
        newState.conversations[action.payload.id] = action.payload;
        return newState;
      case SET_ONE_CONVERSATION_MESSAGES:
        if(!newState.messages) newState.messages = {}
        newState.messages = {...newState.messages, ...action.payload };
        return newState;
      case ADD_MESSAGE_TO_CONVERSATION:
        console.log(action.payload)
        const newMessages = {...state.messages }
        newMessages[action.payload.conversation_id] = [...newMessages[action.payload.conversation_id], action.payload]
        newState.messages = newMessages;
        return newState;
      default:
        return state;
  }
}

export default conversationReducer
