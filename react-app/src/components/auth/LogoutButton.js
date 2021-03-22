import React from "react";
import { logout } from "../../services/auth";
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

const Logout = styled.a`
  font-size: .8rem;
  &:hover {
    cursor: pointer;
  }
`;

const LogoutButton = ({setAuthenticated}) => {
  const history = useHistory();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    history.push('/');
  };

  return <Logout onClick={onLogout}>(logout)</Logout>;
};

export default LogoutButton;
