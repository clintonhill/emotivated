import styled from 'styled-components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.accent};
  transition: background-color .5s ease-in;
  width: 33.3vw;
  padding: 10px;
  border-radius: 10px 0;
  box-shadow: 5px 5px 10px gray;
`;

export const FormRow = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  padding: 5px 0;
  @media (max-width: 700px){
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
  }
`;

export const FormInput = styled.input`
  @media (max-width: 700px){
    width: 100%;
  }
`;

export const Button = styled.button`
  width: 30vw;
`;
