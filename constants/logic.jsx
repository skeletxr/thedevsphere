import { doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
 
 
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
 



export const referLogic = async (user) => {

  const userDoc = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const referId = uuidv4().slice(0, 6); // Generate a 6-digit unique ID
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