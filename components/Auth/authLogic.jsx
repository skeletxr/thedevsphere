 

import { auth, db, provider } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const auths = (type, e,   details, setShowAuth) => {

  e.preventDefault();

    
const cookies = new Cookies();
  if( type === 'signup'){
    signUp(details, cookies, setShowAuth);
     
  }else if(type === 'login'){
    login(details, cookies, setShowAuth);
    
  }else if(type === 'provider'){
   
    authWithProvide(cookies)
  
  }

}

const signUp = async(details, cookies, setShowAuth) =>{
   toast.loading('Creating User...');
    if(details.email === '' || details.password === ''){
      alert('Please fill in all fields');
      return;
    }

    try{
      const useCredentials = await createUserWithEmailAndPassword(auth, details.email, details.password);
      
      console.log("user creditals",useCredentials);
     const res = await setDoc(doc(db, "users", useCredentials.user.uid), {
        name: details.name || '',
        email: details.email,
        password: details.password,
        referId: '',
        referUser: [],
        totalAmountPaidForReferral: 0,
        totalAmountRemainingofReferral: 0,
        purchasedCourses: [],
      });
       console.log(res);
      cookies.set("auth-token", useCredentials.user.accessToken, {
        sameSite: "none",
        secure: true,
      });
      setShowAuth(false)

      toast.dismiss();
      toast.success('User created successfully');
      // window.location.reload();
    }catch(err){
      toast.dismiss();
      console.log(err);
      alert(err.message);
    }

}


const login = async(details,cookies, setShowAuth) =>{
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
    toast.success('Login successful');
    setShowAuth(false);

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
      name: result.user.displayName || '',
      email: result.user.email,
      referId: '',
      referUser: [],
      totalAmountPaidForReferral: 0,
      totalAmountRemainingFromReferral: 0,
      pandingReferUsers: [],
    });
  }
}

export default auths