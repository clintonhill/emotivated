import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components'
import { mainTheme, darkTheme } from '../../theme'

const Container = styled.div`
  background-color:${props => props.theme.accent};
  border-radius: 5px;
  transition: background-color .5s ease-in;
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

const Navbar = ({ authenticated, setAuthenticated, userTheme, setUserTheme }) => {

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
          { !authenticated && <>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </>}
          <button onClick={toggleTheme}>Toggle Theme</button>
          { authenticated && <LogoutButton setAuthenticated={setAuthenticated} /> }
      </Container>
  );
}

export default Navbar;
