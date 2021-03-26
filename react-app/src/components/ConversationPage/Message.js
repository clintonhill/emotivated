import { useSelector } from 'react-redux';
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: grid;
`;
const UserName = styled.span`
  justify-self: ${props => props.user === 'Responder' ? 'end' : 'start'};
`;
const TextContainer = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.primaryText};
  padding: 2px;
  border: 2px black solid;
  width: 48%;
  justify-self: ${props => props.user === 'Responder' ? 'end' : 'start'};
  border-radius: ${props => props.user === 'Responder' ? '10px 0 0 10px' : '0 10px 10px 0'};
  transition: all .5s ease;
`;

export function PublishedMessage({message, nickname}) {


  const user = message => {
    if (message.from_topic_author)
      return 'Author';
    else
      return 'Responder'

    return 'Unknown'
  }
  const current = user(message)

  return(
    <Wrapper>
      <UserName user={current}>{ current }</UserName>
      <TextContainer user={current}>
        {message.message}
      </TextContainer>
    </Wrapper>
  )
}

export default function Message({message, nickname}) {

  const conversations = useSelector(state => state.conversations?.conversations)

  const user = message => {
    if (message.current_is_author)
      return 'You';
    else
      return nickname

    return 'Unknown'
  }
  const current = user(message)

  return(
    <Wrapper>
      <UserName user={current}>{ current }</UserName>
      <TextContainer user={current}>
        {message.message}
      </TextContainer>
    </Wrapper>
  )
}
