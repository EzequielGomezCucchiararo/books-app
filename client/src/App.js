import { useEffect, useState } from 'react';
import Signup from './auth/signup/SignUp';
import BooksHomePage from './books/Books';
import authService from './auth/AuthService';
import * as sc from './App.styled';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(authService.isLoggedIn());
  }, []);

  const handleAuthActionCompleted = () => {
    setSignedIn(authService.isLoggedIn());
  };

  const handleLogout = () => {
    authService.signout();
    setSignedIn(false);
  };

  return (
    <div>
      {signedIn ? (
        <sc.AppContainer>
          <sc.AuthActions>
            <sc.LogoutButton onClick={handleLogout}>Log out</sc.LogoutButton>
          </sc.AuthActions>
          <BooksHomePage />
        </sc.AppContainer>
      ) : (
        <Signup onAuthActionCompleted={handleAuthActionCompleted} />
      )}
    </div>
  );
}

export default App;
