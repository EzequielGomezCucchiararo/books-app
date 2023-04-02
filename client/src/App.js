import { useState } from 'react';
import Signup from './auth/signup/SignUp';
import BooksHomePage from './books/Books';

function App() {
  const [token, setToken] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const handleAuthAction = (newToken) => {
    setToken(newToken);
    setSignedIn(true);
  };

  return (
    <div>
      {!signedIn ? (
        <Signup onAuthActionCompleted={handleAuthAction} />
      ) : (
        <BooksHomePage token={token} />
      )}
    </div>
  );
}

export default App;
