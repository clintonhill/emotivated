import styled from 'styled-components'
import { useState } from 'react'

const END_STATE_NONE = 0;
const END_STATE_GIVE_KUDOS = 1;
const END_STATE_PUBLISH = 2;

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const Wrapper = styled.div`
  display: flex;
  height: 10%;
  align-items: center;
  border: solid black 1px;
  margin: 5px;
  padding: 3px;
`;

const DisconnectBefore = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  button {
    height: 50%;
  }
`;

const DisconnectAfter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RatingButton = styled.button`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/${props=>props.hexcode}");
  color: ${props => props.theme.primaryText};
  height: 35px;
  width: 35px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }`;

const PublishAfter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export default function EndContainer({activeConversation, socket, user, chatDisabled}) {
  const [endState, setEndState] = useState(0)
  const [rewardOther, setRewardOther] = useState(false)
 //socket.emit('client_message', JSON.stringify({ content: currentMessage, user_from: user.id, conversation_id: activeConversation }))
  const endChat = (publish=false) => {
    socket.emit('reward', JSON.stringify({
      user_from: user.id,
      conversation_id: activeConversation,
      reward_other: rewardOther,
      make_public: publish
    }))
  }
  if(chatDisabled){
    return <Wrapper>This conversation has been concluded.</Wrapper>
  }
  return (
  <Wrapper>
      {endState === END_STATE_NONE &&
      <DisconnectBefore>
        <h6>You can always end a conversation. Once you end the conversation you can choose if you want to give kudos to your chat partner or not.</h6>
        <button onClick={() => setEndState(1)}>End Conversation</button>
      </DisconnectBefore>}
      {endState === END_STATE_GIVE_KUDOS  && <DisconnectAfter>
        <h6>How was this conversation? Clicking the smile will give your chat partner Kudos, and a new sticker.</h6>
        <RatingContainer>
          <RatingButton hexcode={'1F641.svg'} onClick={() => {
            setEndState(2);
            setRewardOther(false);
          }} />
          <RatingButton hexcode={'1F642.svg'} onClick={() => {
            setEndState(2);
            setRewardOther(true);
          }} />
        </RatingContainer>
      </DisconnectAfter>}
      {endState === END_STATE_PUBLISH &&
      <PublishAfter>
        <h6>Do you think this conversation could help others? Click publish! Don't worry, you stay anonymous!</h6>
        <>
        <button onClick={ () => endChat(true)}>Publish</button>
        <button onClick={ () => endChat(false)}>Not today</button>
        </>
      </PublishAfter>}
    </Wrapper>
  )
}
