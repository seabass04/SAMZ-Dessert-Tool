import React, { useContext, useEffect, useState, createContext } from 'react'
import { auth } from '../../Firebase'
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'

export const AuthContext = createContext(null);

export const GetUser = () => {
    return useContext(AuthContext);
}; 

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    /* useEffect(() => {
        onAuthStateChanged(auth, setCurrentUser);
    }, []); */

/*     useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
          if (!currentUser) {
            setCurrentUser(null);
            console.log("null");
          } 
          else {
            setCurrentUser(currentUser);
            console.log(currentUser.uid);
          }
        });
      }, []); */

    useEffect(() => {
        return onIdTokenChanged(auth, async (currentUser) => {
          if (!currentUser) {
            setCurrentUser(null);
            console.log("null");
          } 
          else {
            setCurrentUser(currentUser);
            console.log(currentUser.uid);
          }
        });
    }, []);


    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}