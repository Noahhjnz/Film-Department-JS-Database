// RouterApp.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import AuthPage from './firebaselogin.js';
import MainProject from './App.js'; 

const RouterApp = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);
      if (!u) navigate("/login");
      else navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  if (checkingAuth) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={user ? <MainProject /> : <AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/dashboard" element={user ? <MainProject /> : <AuthPage />} />
    </Routes>
  );
};

export default RouterApp;
