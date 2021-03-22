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

export default function TopicRow({topic}) {
  return (
    <TopicWrapper>
      <h5>{topic.name}</h5>
      <h6>{topic.description}</h6>
    </TopicWrapper>
  )
}
