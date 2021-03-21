import styled from 'styled-components'

const ContentWrapper = styled.div`
  background-color: ${props => props.theme.accent};
  padding: 5px;
  border-radius: 5px;
  box-shadow: 3px 3px 5px gray;
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 80%;
  height: 80%;
  background-image: url(${props => props.src});
`;


export default function TutorialBox({content, slide}) {
  return (
    <ContentWrapper>
      <h4>{content[slide].text}</h4>
      <Image src={content[slide].image} />
    </ContentWrapper>
  )
}
