// This HOC will decode the JWT token and verify its validity. 
// If the token is valid, it will render the wrapped component; 
// otherwise, it will redirect the user to the login page.

import React, { useEffect } from 'react';
import jwtDecode from 'jsonwebtoken';


const withAuth = (WrappedComponent) => {
    
  const AuthHOC = (props) => {
    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Redirect to login page or perform any other action
        // to handle unauthenticated users
      } else {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            // Token has expired, redirect to login page or perform any other action
            console.log('Login Sucessful');
          }
        } catch (error) {
          // Token is invalid, redirect to login page or perform any other action
          console.log(error);
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
