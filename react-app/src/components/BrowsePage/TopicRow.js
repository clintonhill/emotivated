import styled from 'styled-components'

const TopicWrapper = styled.div`
  width: 98%;
  height: 20%;
  background-color: ${props => props.theme.accent};
  margin: 5px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px black dashed;

  &:hover {
    border: 2px black solid;
  }

  h5, h6 {
    margin: 0;
    padding: 5px;
  }

  h5 {
    font-weight: bolder;
  }
`;

const UsersDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: x-small;
  padding-right: 5px;
  padding-left: 5px;
  box-sizing: border-box;
  color: yellow;
`;

const truncateText = (text, characters) => {
  let truncated = text.split('').slice(0, characters).join('')
  if(truncated !== text) {
    truncated += '...'
  }
  return truncated;
}

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`

export default function TopicRow({topic}) {
  if(!topic || !topic.topic) return null;
  return (
    <TopicWrapper>
      <h5>{truncateText(topic.topic.name, 200)}</h5>
      <h6>{truncateText(lorem, 250)}</h6>
      <UsersDiv>
        <span>{topic.topic.author_nickname}</span>
        <span>{topic.responder_nickname}</span>
      </UsersDiv>
    </TopicWrapper>
  )
}
