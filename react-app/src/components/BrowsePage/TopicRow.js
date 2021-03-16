import styled from 'styled-components'

const TopicWrapper = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${props => props.theme.accent};
  margin: 4px;
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

const dummy = {
  topic: 'This is a topic that I feel down about, or need general advice on.',
  body: `Something really frustrating happened, and this is the contents of the post. I really would like some advice about this super frustrating thing. Thank you all for your kind words, and I'm looking forward to chatting with you all. You're all great. Sorry for rambling.`,
  username: 'Ignorant Ape',
}

export default function TopicRow() {
  return (
    <TopicWrapper>
      <h5>{dummy.topic}</h5>
      <h6>{dummy.body}</h6>
    </TopicWrapper>
  )
}
