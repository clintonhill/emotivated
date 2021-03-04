import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components'
import { mainTheme, darkTheme } from '../../theme'

const NavWrapper = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainer = styled.div`
  background-color:${props => props.theme.accent};
  border-radius: 5px;
  transition: background-color .5s ease-in;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  width: 100%;
`;

const BottomContainer = styled.div`
  background-color: hsla(36.951219512195124, 82%, 60.7843137254902%, 0.781);
  width: 85%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 5px 5px;
`;

const Logo = styled.div`
  background-image: url("${process.env.PUBLIC_URL}${props => props.theme.logoPath}");
  width: 175px;
  height: 50px;
  background-position: center;
  background-repeat: no-repeat;
`;

const ThemeButton = styled.input`
  background-image: url("${process.env.PUBLIC_URL}${process.env.REACT_APP_STICKER_FOLDER}/${props => props.theme.toggleHex}.svg");
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${props => props.theme.primaryText};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const Navbar = ({ authenticated, setAuthenticated, userTheme, setUserTheme }) => {

  const toggleTheme = () => {
    let newTheme = darkTheme;
    if(userTheme === darkTheme)
      newTheme = mainTheme;

    setUserTheme(newTheme);

  }

  return (
    <NavWrapper>
      <TopContainer>
          <Logo />
          <ThemeButton type='button' onClick={toggleTheme}/>
      </TopContainer>
      <BottomContainer>
          <NavLink className='tab' exact to="/" activeClassName='active'>
            Home
          </NavLink>
          { !authenticated && <>
            <NavLink className='tab' to="/login" activeClassName='active'>
              Login
            </NavLink>
            <NavLink className='tab' to="/sign-up" activeClassName='active'>
              Sign up
            </NavLink>
          </>}
          { authenticated && <LogoutButton setAuthenticated={setAuthenticated} /> }
          </BottomContainer>
          </NavWrapper>
  );
}

export default Navbar;
