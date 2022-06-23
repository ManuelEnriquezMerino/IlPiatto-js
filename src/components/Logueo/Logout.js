import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout }= useAuth0();

  return (
    <button className='navbutton' onClick={() => {
      logout({ returnTo: "https://il-piatto-js.herokuapp.com/" });
    }}>Log out</button>
  );
}

export default LogoutButton;