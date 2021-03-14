import React, { createContext, useState } from 'react';
import { app } from './../firebase';

export const AuthContext = createContext();

export const AuthProvider = props => {

  const [user, setUser] = useState(false);

  app.auth().onAuthStateChanged(user => {
    if (!user) setUser(false);
    if (user) setUser(true);
  });

  return (
    <AuthContext.Provider value={user}>
      {props.children}
    </AuthContext.Provider>
  )
};

