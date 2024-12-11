import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";




const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(false)
const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        
        setIsAuthorized(true);
        setUser(user);
         
      } 
    });

    return () => unsubscribeAuth();
  }, []);


  return <GlobalContext.Provider value={{
    isAuthorized,
    user
  }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };