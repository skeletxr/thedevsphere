import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";



const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(false)
const [user, setUser] = useState(null);
const [userDetails, setUserDetails] = useState(null)



const getUserInfo = async(userD) =>{
  setUser(userD);

  const userDoc = doc(db, "users",userD.uid);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    const userData = await userSnapshot.data();
console.log(userData)
    setUserDetails(userData);
  } else {
    console.log("No such document!");
  }
}

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((userD) => {
      if (userD) {
        getUserInfo(userD); // Call getUserInfo when user is signed in
        setIsAuthorized(true);
      } 
    });

    return () => unsubscribeAuth();
  }, []);

  

  return <GlobalContext.Provider value={{
    isAuthorized,
    user,
    userDetails
  }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };