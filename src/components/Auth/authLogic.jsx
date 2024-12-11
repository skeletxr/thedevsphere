import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";
import Cookies from "universal-cookie";

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
      console.log(useCredentials);
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
}

export default auths