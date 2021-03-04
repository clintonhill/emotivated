import styled from 'styled-components'
import faker from 'faker'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: grid;
`;
const UserName = styled.span`
  justify-self: ${props => props.user == 2 ? 'end' : 'start'};
`;
const TextContainer = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.primaryText};
  padding: 2px;
  border: 2px black solid;
  width: 48%;
  justify-self: ${props => props.user == 2 ? 'end' : 'start'};
  border-radius: ${props => props.user == 2 ? '10px 0 0 10px' : '0 10px 10px 0'};
  transition: all .5s ease;
`;

export default function Message({user}) {
  return(
    <Wrapper>
      <UserName user={user}>{ user==2 ? 'You' : 'Zany Giraffe' }</UserName>
      <TextContainer user={user}>
        {faker.lorem.sentences()}
      </TextContainer>
    </Wrapper>
  )
}
