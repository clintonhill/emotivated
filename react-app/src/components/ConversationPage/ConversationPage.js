import styled from 'styled-components'
import Message from './Message'
import User from './User'
import faker from 'faker'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatPartners, getConversationMessages, addMessageToConversation } from '../../store/conversations';

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ChatComponent = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  margin-top: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 2px 5px gray;
`;

const ChatList = styled.div`
  height: 100%;
  width: 20%;
  background-color: ${props => props.theme.accent};
  border-radius: 10px 10px 0 0;
  margin-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Chat = styled.div`
  width: 80%;
  height: 100%;
  background-color: ${props => props.theme.accent};
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
`;

const EndContainer = styled.div`
  display: ${props => props.activeConversation ? "flex": "none"};
  justify-content: space-between;
  height: 20px;
  align-items: center;
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
`;

const socket = io();

export default function ConversationPage() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);

  const user = useSelector(state => state.session);
  const conversations = useSelector(state => state.conversations?.conversations)
  const messages = useSelector(state => activeConversation && state.conversations.messages)

  const dispatch = useDispatch();
  const onSend = () => {
    socket.emit('client_message', JSON.stringify({content: currentMessage, user_from: user.id, conversation_id: activeConversation }))
    setCurrentMessage('');
  }

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
  }, [])

  //Get users that the current user is in conversations with.
  useEffect(() => {
    dispatch(getChatPartners(user.id));
  }, [dispatch, user])

  //Get the conversation of the active user
  useEffect(() => {
    dispatch(getConversationMessages(activeConversation))
    socket.emit('connection', user.id)
  }, [dispatch, activeConversation])

  return (
      <PageWrapper>
        <ChatComponent>
          <ChatList>
            {conversations && Object.values(conversations).map(conversation => <User
            user={conversation.responder_nickname}
            id={conversation.id}
            setActiveConversation={setActiveConversation}
            />)}
          </ChatList>
          <Chat>
            <ConversationPane>
              {activeConversation && conversations[activeConversation] && <TopicContainer>
                <h3>{conversations[activeConversation].topic.name}</h3>
                <h5>{conversations[activeConversation].topic.description}</h5>
              </TopicContainer>}
              {messages && messages[activeConversation] && messages[activeConversation].map(message => <Message message={message}/>)}
              <EndContainer activeConversation={activeConversation}>
                <h6>You can always end a conversation. Once you end the conversation you can choose if you want to give kudos to your chat partner or not.</h6>
                <button>End Conversation</button>
              </EndContainer>
            </ConversationPane>
            <UserInputArea>
              <ChatInput
              value={currentMessage}
              onChange={(e)=> setCurrentMessage(e.target.value)}
              disabled={!activeConversation}
              />
              <SendButton disabled={!activeConversation} onClick={onSend} />
            </UserInputArea>
          </Chat>
        </ChatComponent>

      </PageWrapper>
  )
}
