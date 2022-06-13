import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithPopup } = useAuth0();

  return (
    <button className='navbutton' onClick={() => loginWithPopup()}>Log in</button>
  );
}

export default LoginButton;