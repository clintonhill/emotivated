import styled from 'styled-components'
import EndContainer from './EndContainer'
import Message from './Message'
import User from './User'
import { PageWrapper } from '../styles'
import { io } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatPartners, getConversationMessages, addMessageToConversation, setOneConversation } from '../../store/conversations';

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const ChatComponent = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  margin-top: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 2px 5px gray;
  @media(max-width:800px) {
    width: 100%;
  }
`;

const ChatList = styled.div`
  height: 100%;
  width: 20%;
  background-color: ${props => props.theme.accent};
  border-radius: 10px 10px 0 0;
  margin-right: 10px;
  overflow-y: scroll;
  @media(max-width:800px) {
    margin-right: 5px;
  }
`;

const Chat = styled.div`
  width: 80%;
  height: 100%;
  background-color: ${props => props.theme.tertiaryBackground};
  border-radius: 10px 10px 0 0;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
`;

const ConversationPane = styled.div`
  width: 100%;
  height: 90%;
  background-color: rgba(255, 255, 255, 0.335);
  overflow: scroll;
  overflow-x: hidden;
`;

const TopicContainer = styled.div`

`;

const UserInputArea = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  align-items: center;
`;

const ChatInput = styled.textarea`
  width: 98%;
  height: auto;
  margin-top: 5px;
  border-radius: 10px;
  padding: 3px;
  z-index: 2;
  &:disabled {
    cursor: not-allowed;
  }
`;


const SendButton = styled.button`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/25B6.svg");
  color: ${props => props.theme.primaryText};
  width: 30px;
  height: 30px;
  padding: 3px;
  margin-right: 3px;
  margin-left: 3px;
  margin-top: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.secondaryBackground};
  }
`;

let socket;
const establishSocket = () => {
  if (process.env.NODE_ENV === 'production') {
    socket = io('https://emotivated.herokuapp.com');
  } else {
    socket = io();
  }
  return socket;
}
export default function ConversationPage({ forceConversation, setForceConversation }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [chatDisabled, setChatDisabled] = useState(false)
  const endRef = useRef(null);

  const user = useSelector(state => state.session);
  const conversations = useSelector(state => state.conversations?.conversations)
  const messages = useSelector(state => activeConversation && state.conversations.messages)

  const dispatch = useDispatch();

  useEffect(() => {
    establishSocket()
  }, [])


  const onSend = () => {
    socket.emit('client_message', JSON.stringify({ content: currentMessage, user_from: user.id, conversation_id: activeConversation }))
    setCurrentMessage('');
  }

  useEffect(() => {
    activeConversation && endRef?.current?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start' })
  })

  useEffect(() => {
    socket.on('message', msg => {
      const payload = {
        conversation_id: msg.conversation_id,
        current_is_author: msg.is_author,
        is_edited: false,
        message: msg.msg,
        timestamp: Date.now()
      }
      dispatch(addMessageToConversation(payload));
    })
    socket.on('connection_event', (msg) => console.log(`Connected as ${msg}`))
    socket.on('conversation_end', (conversationId) => {
      // console.log('Trying to close conversation ' + conversationId)
      // let newState = {...conversations[conversationId]}
      // newState.is_closed = true;
      // dispatch(setOneConversation(newState))
      dispatch(getChatPartners(user.id));
    })
  }, [dispatch])

  //Get users that the current user is in conversations with.
  useEffect(() => {
    dispatch(getChatPartners(user.id));
  }, [dispatch, user])

  //If the id is set, open that conversation
  useEffect(() => {
    if (forceConversation) {
      setActiveConversation(forceConversation);
      setForceConversation(null)
    }
  }, [forceConversation, setForceConversation, setActiveConversation])

  //Get the conversation of the active user
  useEffect(() => {
    if(!activeConversation) return;
    dispatch(getConversationMessages(activeConversation))
    socket.emit('connection', user.id)
  }, [dispatch, activeConversation, user.id])

  //Check if the chat is disabled
  useEffect(() => {
    if(conversations && activeConversation) {
      if(conversations[activeConversation].is_closed === true) {
        setChatDisabled(true)
      } else {
        setChatDisabled(false)
      }
    }
  }, [activeConversation, conversations])

  const getNickname = (conversation) => {
    if (conversation.current_is_author) {
      return conversation.topic.author_nickname;
    }
    return conversation.responder_nickname;
  }

  return (
    <PageWrapper>
      <ChatComponent>
        <ChatList>
          {conversations && Object.values(conversations).map(conversation => <User
            user={getNickname(conversation)}
            id={conversation.id}
            setActiveConversation={setActiveConversation}
            key={conversation.id}
            isClosed={conversation.is_closed}
          />)}
        </ChatList>
        <Chat>
          {activeConversation && conversations && getNickname(conversations[activeConversation])}
          <ConversationPane>
            {activeConversation && conversations[activeConversation] && <TopicContainer>
              <h3>{conversations[activeConversation].topic.name}</h3>
              <h5>{conversations[activeConversation].topic.description}</h5>
            </TopicContainer>}
            {messages && messages[activeConversation] && messages[activeConversation].map(message => <Message key={message.id} message={message} nickname={getNickname(conversations[activeConversation])} />)}
            {activeConversation && <EndContainer activeConversation={activeConversation} user={user} socket={socket} chatDisabled={chatDisabled}/> }
            <div ref={endRef}/>
          </ConversationPane>
          <UserInputArea>
            <ChatInput
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              disabled={!activeConversation || chatDisabled}
            />
            <SendButton disabled={!activeConversation || chatDisabled} onClick={onSend} />
          </UserInputArea>
        </Chat>
      </ChatComponent>

    </PageWrapper>
  )
}
