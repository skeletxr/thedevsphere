"use client";

import { createContext, useEffect, useState } from "react";

 
import { doc, getDoc } from "firebase/firestore";
import { auth,db } from "@/firebaseConfig";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const getUserInfo = async (userD) => {
    setUser(userD);

    const userDoc = doc(db, "users", userD.uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      // console.log(userData);
      setUserDetails(userData);
    } else {
      setUserDetails(null);
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((userD) => {
      if (userD) {
        getUserInfo(userD); // Call getUserInfo when user is signed in
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        setUser(null);
        setUserDetails(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isAuthorized,
        user,
        userDetails,
        setShowAuth,
        showAuth
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };