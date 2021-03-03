import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import styled from 'styled-components'
import { FormWrapper, FormRow, Button, FormInput, OverflowLabel } from '../Forms/styles'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const WelcomeMessage = styled.p`
  font-size: large;
`;

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
    <MainWrapper>
      <WelcomeMessage>
      Welcome to eMotivated. Sign up to send positive words and encouragement.
      </WelcomeMessage>
      <FormWrapper>
        <FormRow>
          <OverflowLabel>User Name</OverflowLabel>
          <FormInput
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          />
        </FormRow>

        <FormRow>
          <OverflowLabel>Email</OverflowLabel>
          <FormInput
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          />
        </FormRow>

        <FormRow>
          <OverflowLabel>Password</OverflowLabel>
          <FormInput
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          />
        </FormRow>

        <FormRow>
          <OverflowLabel>Repeat Password</OverflowLabel>
          <FormInput
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          />
        </FormRow>

        <Button type="submit">Sign Up</Button>
      </FormWrapper>
    </ MainWrapper>
    </form>
  );
};

export default SignUpForm;
