// src/FirebaseLogin.js
import React, { useEffect, useRef } from 'react';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

function FirebaseLogin({ onLogin }) {
  const auth = getAuth();
  const uiRef = useRef(null);

  useEffect(() => {
    if (!uiRef.current) {
      const ui = new firebaseui.auth.AuthUI(auth);
      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          EmailAuthProvider.PROVIDER_ID,
          GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: function (authResult) {
            onLogin(authResult.user); // Notify parent of login
            return false; // Prevent redirect
          },
        },
      });
      uiRef.current = ui;
    }
  }, [auth, onLogin]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default FirebaseLogin;
