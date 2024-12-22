import { doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
 
 
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { supabase } from "@/supabase";
 


const storeUserReferral = async (userId, referralCode) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, referral_code: referralCode }]);

    if (error) {
      console.log('Error storing user referral code:', error.message, error.details, error.hint);
      return { success: false, error };
    }

    console.log('User referral code stored successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error storing user referral code:', error.message);
    return { success: false, error };
  }
};


export const referLogic = async (user) => {

  const userDoc = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDoc);
  let referId = null;
  storeUserReferral(user.uid, referId);

  if (userSnapshot.exists()) {
     referId = uuidv4().slice(0, 6);  
    await updateDoc(userDoc, {
      referId: referId
    });
    return referId;
  }
}

export const logout = async () => {
  
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
}