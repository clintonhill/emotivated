import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import styled from 'styled-components'
import { FormWrapper, FormRow, Button, FormInput } from '../Forms/styles'
import { useDispatch } from "react-redux";
import { setUser } from "../../store/session";

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

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user))
      history.push('/')

    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <MainWrapper>
      <WelcomeMessage>
      Welcome back. Please login to send positive words and encouragement.
      </WelcomeMessage>
      <FormWrapper>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <FormRow>
        <label htmlFor="email">Email</label>
        <FormInput
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="password">Password</label>
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </FormRow>
        <Button type="submit">Login</Button>
      </FormWrapper>
      </MainWrapper>
    </form>
  );
};

export default LoginForm;
