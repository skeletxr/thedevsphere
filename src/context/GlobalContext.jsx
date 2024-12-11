import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";



const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(false)
const [user, setUser] = useState('');
const [userDetails, setUserDetails] = useState(null)
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        
        setIsAuthorized(true);
        setUser(user);
         
      } 
    });

    return () => unsubscribeAuth();
  }, []);

  const getUserInfo = async() =>{
    const userDoc = doc(db, "users", user?.user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = await userSnapshot.data();
      console.log("Document data:", userData);

      setUserDetails(userData);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getUserInfo();
  
    return () => {
      getUserInfo();
    }
  }, [])
  

  return <GlobalContext.Provider value={{
    isAuthorized,
    user,
    userDetails
  }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };