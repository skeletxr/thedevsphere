import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";
import Cookies from "universal-cookie";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {collection, getDoc} from 'firebase/firestore';

const auths = (type, e,   details) => {

  e.preventDefault();

    
const cookies = new Cookies();
  if( type === 'signup'){
    signUp(details, cookies);
     
  }else if(type === 'login'){
    login(details);
    
  }else if(type === 'provider'){
   
    authWithProvide(cookies)
  
  }

}

const signUp = async(details, cookies) =>{
    if(details.email === '' || details.password === ''){
      alert('Please fill in all fields');
      return;
    }

    try{
      const useCredentials = await createUserWithEmailAndPassword(auth, details.email, details.password);
      
      await setDoc(doc(db, "users", useCredentials.user.uid), {
        name: details.name || '',
        email: details.email,
        password: details.password,
        referId: '',
        referUser: [],
        totalAmountPaidForReferral: 0,
        totalAmountRemainingFromReferral: 0,
        pandingReferUsers: [],
      });
      cookies.set("auth-token", userCredential.user.accessToken, {
        sameSite: "none",
        secure: true,
      });

    }catch(err){
      alert(err.message);
    }

}


const login = async(details,cookies) =>{
  if(details.email === '' || details.password === ''){
    alert('Please fill in all fields');
    return;
  }

  try{
    const userCredential = await signInWithEmailAndPassword(auth, details.email, details.password);
    cookies.set("auth-token", userCredential.user.accessToken, {
      sameSite: "none",
      secure: true,
    });



  }
  catch(err){
    alert(err.message);
  }
}

const authWithProvide = async(cookies) =>{
  const result = await signInWithPopup(auth, provider);
  cookies.set("auth-token", result.user.accessToken, {
    sameSite: "none",
    secure: true,
  });

  const userDoc = doc(db, "users", result.user.uid);
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    await setDoc(userDoc, {
      // name: result.user.displayName || '',
      // email: result.user.email,
      referId: '',
      referUser: [],
      totalAmountPaidForReferral: 0,
      totalAmountRemainingFromReferral: 0,
      pandingReferUsers: [],
    });
  }
}

export default auths