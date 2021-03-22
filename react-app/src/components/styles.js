import styled from 'styled-components'

export const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const MainComponent = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 2px 5px gray;
  background-color: #E8BA71;
  @media(max-width:800px) {
    width: 90%;
  }
  @media(max-width: 600px) {
    width: 100%;
  }
  p {
    font-size: larger;
    font-weight: bold;
  }
`;
