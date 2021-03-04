import styled from 'styled-components'
import Message from './Message'
import User from './User'
import faker from 'faker'

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ChatComponent = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  margin-top: 30px;
  box-shadow: 8px 8px 8px gray;
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

const SendButton = styled.button`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/25B6.svg");
  width: 30px;
  height: 30px;
  padding: 3px;
  margin-right: 3px;
  margin-left: 3px;
  margin-top: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${props => props.theme.backgroundColor};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export default function ConversationPage() {
  return (
      <PageWrapper>
        <ChatComponent>
          <ChatList>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
            <User user={faker.internet.userName()}/>
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
            <UserInputArea>
              <ChatInput/>
              <SendButton />
            </UserInputArea>
          </Chat>
        </ChatComponent>

      </PageWrapper>
  )
}
