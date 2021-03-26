import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {MainComponent, PageWrapper} from '../styles'
import { useEffect } from 'react'
import { getPublishedConversationMessages } from '../../store/conversations'
import  {PublishedMessage} from '../ConversationPage/Message'

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
  /* margin-top: 30px; */
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
  const messages = useSelector(state => state.conversations.published_messages)
  const dispatch = useDispatch();

  useEffect(() => {;
    dispatch(getPublishedConversationMessages(conversationId))
  }, [dispatch])

  const getNickname = (message) => {
    if (message.from_topic_author) {
      return "Author"
    }
    return "Responder"
  }

  return (
  <PageWrapper>
    <MainComponent>
      <Chat>
        Viewing Published Conversation
        <ConversationPane>
        {/* {conversations && conversations[conversationId] && <TopicContainer>
              <h3>{conversations[conversationId].topic.name}</h3>
              <h5>{conversations[conversationId].topic.description}</h5>
            </TopicContainer>} */}
           {messages && messages[conversationId] &&
            messages[conversationId].map(message =>
            <PublishedMessage key={message.id} message={message} nickname={()=>getNickname(message)} isPublished={true}/>)}
        </ConversationPane>
      </Chat>
    </MainComponent>
  </PageWrapper>
  )
}
