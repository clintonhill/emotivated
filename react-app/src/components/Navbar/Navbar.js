import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components'

const Container = styled.div`
  background-color: goldenrod;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const Logo = styled.div`
  background-image: url("/images/emotivated.svg");
  width: 175px;
  height: 50px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Navbar = ({ setAuthenticated }) => {
  return (
      <Container>
          <Logo />
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
          <LogoutButton setAuthenticated={setAuthenticated} />
      </Container>
  );
}

export default Navbar;
