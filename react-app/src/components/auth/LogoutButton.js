import React from "react";
import { logout } from "../../services/auth";
import styled from 'styled-components'

const Logout = styled.a`
  font-size: .8rem;
  &:hover {
    cursor: pointer;
  }
`;

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <Logout onClick={onLogout}>(logout)</Logout>;
};

export default LogoutButton;
