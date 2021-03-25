import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const TextContainer = styled.div`
  color: ${props => props.theme.primaryText};
  background-color: ${props => props.isClosed ? props.theme.tertiaryBackground : ''};
  width: 100%;
  transition: all .5s ease;
  margin-top: 10px;
  padding-left: 5px;
  &:hover{
    background-color: ${props => props.theme.primaryText};
    color: ${props => props.theme.backgroundColor};
    cursor: pointer;
  }
`;

export default function User({user, id, setActiveConversation, isClosed}) {
  return(
    <Wrapper onClick={()=> setActiveConversation(id)}>
      <TextContainer isClosed={isClosed}>
        {user}
      </TextContainer>
    </Wrapper>
  )
}
