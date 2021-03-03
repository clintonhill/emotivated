import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components'
import { mainTheme, darkTheme } from '../../theme'

const Container = styled.div`
  background-color:${props => props.theme.accent};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const Logo = styled.div`
  background-image: url("${props => props.theme.logoPath}");
  width: 175px;
  height: 50px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Navbar = ({ setAuthenticated, userTheme, setUserTheme }) => {

  const toggleTheme = () => {
    let newTheme = darkTheme;
    if(userTheme === darkTheme)
      newTheme = mainTheme;

    setUserTheme(newTheme);

  }

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
          <button onClick={toggleTheme}>Toggle Theme</button>
          <LogoutButton setAuthenticated={setAuthenticated} />
      </Container>
  );
}

export default Navbar;
