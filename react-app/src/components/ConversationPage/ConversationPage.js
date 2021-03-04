import styled from 'styled-components'
import Message from './Message'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ChatComponent = styled.div`
  width: 85%;
  height: 85%;
  display: flex;
  margin-top: 10px;
`;

const ChatList = styled.div`
  height: 100%;
  width: 20%;
  background-color: ${props => props.theme.accent};
  border-radius: 10px 10px 0 0;
  margin-right: 10px;
`;

const Chat = styled.div`
  width: 80%;
  height: 100%;
  background-color: ${props => props.theme.accent};
  border-radius: 10px 10px 0 0;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ConversationPane = styled.div`
  width: 100%;
  height: 90%;
  background-color: rgba(255, 255, 255, 0.335);
  overflow: scroll;
  overflow-x: hidden;
`;

const ChatInput = styled.input`
  width: 100%;
  height: 10%;
  margin-top: 5px;
`;

export default function ConversationPage() {
  return (
      <PageWrapper>
        <ChatComponent>
          <ChatList>
            Hello
          </ChatList>
          <Chat>
            <ConversationPane>
              <Message/>
              <Message user='2'/>
              <Message/>
              <Message/>
              <Message user='2'/>
              <Message/>
            </ConversationPane>
            <ChatInput/>
          </Chat>
        </ChatComponent>

      </PageWrapper>
  )
}
