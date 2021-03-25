import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {MainComponent, PageWrapper} from '../styles'
import { useEffect } from 'react'
import { getConversationMessages } from '../../store/conversations'
import Message from '../ConversationPage/Message'

const Chat = styled.div`
  width: 90%;
  height: 100%;
  background-color: ${props => props.theme.tertiaryBackground};
  border-radius: 10px 10px 0 0;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  margin-top: 30px;
  box-sizing: border-box;
`;

const ConversationPane = styled.div`
  width: 100%;
  height: 90%;
  background-color: rgba(255, 255, 255, 0.335);
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 10px;
`;

const TopicContainer = styled.div`

`;

export default function PublishedConversation() {
  const {conversationId} = useParams();
  const messages = useSelector(state => state.conversations.messages)
  const dispatch = useDispatch();

  useEffect(() => {;
    dispatch(getConversationMessages(conversationId))
  }, [dispatch])

  const getNickname = (conversation) => {
    if (conversation.current_is_author) {
      return conversation.topic.author_nickname;
    }
    return conversation.responder_nickname;
  }

  return (
  <PageWrapper>
    <MainComponent>
      <Chat>
        Bobby & Joe
        <ConversationPane>
        {/* {conversations && conversations[conversationId] && <TopicContainer>
              <h3>{conversations[conversationId].topic.name}</h3>
              <h5>{conversations[conversationId].topic.description}</h5>
            </TopicContainer>} */}
           {messages && messages[conversationId] &&
            messages[conversationId].map(message =>
            <Message key={message.id} message={message} nickname={"Mike"} />)}
        </ConversationPane>
      </Chat>
    </MainComponent>
  </PageWrapper>
  )
}
