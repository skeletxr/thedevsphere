"use client";

import { createContext, useEffect, useState } from "react";

 
import { doc, getDoc } from "firebase/firestore";
import { auth,db, realTimeDataBase } from "@/firebaseConfig";

import { ref, get } from "firebase/database";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
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

  const checkCoursePurchasedPending = async (id) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
  
    const userRef = ref(realTimeDataBase, `users/${id}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log("is course purchased", userData);
      setIsCoursePurchased(true);
    } else {
      console.log("No such document!");
      setIsCoursePurchased(false);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((userD) => {
      if (userD) {
        getUserInfo(userD); // Call getUserInfo when user is signed in
        setIsAuthorized(true);
        checkCoursePurchasedPending(userD.uid);
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
        showAuth,
        isCoursePurchased,
        checkCoursePurchasedPending,
        getUserInfo
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };