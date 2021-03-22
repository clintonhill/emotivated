import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { mainTheme } from './theme'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import IndexPage from './components/IndexPage'
import ConversationPage from './components/ConversationPage'
import NewEmotivation from './components/NewEmotivation'
import { authenticate } from "./services/auth";
import { setUser } from './store/session'
import { useDispatch } from "react-redux";
import ProfilePage from "./components/ProfilePage";
import BrowsePage from "./components/BrowsePage";


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Rosario', sans-serif;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryText };
    transition: all .5s ease-in;
    padding: 0;
    margin: 0;
    border: 0;
  }
  .active {
    background-color: ${props => props.theme.accent};
    font-weight: bold;
    box-shadow: 2px 5px 5px gray;
  }

  .tab {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0 0 5px 5px;
    text-decoration: none;
    color: ${props => props.theme.primaryText};
    padding-top: 4px;
    @media(max-width: 900px) {
      font-size: smaller;
    }
  }
  html {
    overflow: hidden;
  }
`;


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [forceConversation, setForceConversation] = useState(null)
  const [userTheme, setUserTheme] = useState(mainTheme)
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={ userTheme }>
      <GlobalStyle />
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} userTheme={userTheme} setUserTheme={setUserTheme} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <Route path='/conversations' exact authenticated={authenticated}>
          <ConversationPage forceConversation={forceConversation} setForceConversation={setForceConversation}/>
        </Route>
        <ProtectedRoute path='/profile/:userId' exact={true} authenticated={authenticated}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/new' exact authenticated={authenticated}>
          <NewEmotivation />
        </ProtectedRoute>
        <ProtectedRoute path='/browse' exact authenticated={authenticated}>
          <BrowsePage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <IndexPage setForceConversation={setForceConversation} authenticated={authenticated}/>
        </Route>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
