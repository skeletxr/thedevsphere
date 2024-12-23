// "use server";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { signOut } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { supabase } from "@/supabase";

// Store the user's referral code in the 'users' table
// Function to store referral code in Supabase

const generateReferralCode = () => {
  // Generate a UUID (v4)
  const uuid = uuidv4();

  // Extract a part of the UUID and convert it into a 6-digit number
  const numericCode = parseInt(uuid.replace(/[^0-9]/g, "").substring(0, 6), 10);

  // Ensure it's a 6-digit code
  const referralCode = numericCode.toString().padStart(6, "0");
  return referralCode;
};

const storeUserReferral = async (user_id, referral_code) => {
  try {
    // Check if the user already exists in the database
    const { data, error } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", user_id);

    if (error) {
      throw new Error("Error checking user existence: " + error.message);
    }

    if (data.length > 0) {
      // Update existing user's referral code if user exists
      const { updateError } = await supabase
        .from("users")
        .update({ referral_code })
        .eq("user_id", user_id);

      if (updateError) {
        throw new Error("Error updating referral code: " + updateError.message);
      }
    } else {
      // Insert new user if user does not exist
      const { insertError } = await supabase
        .from("users")
        .insert([{ user_id, referral_code }]);

      if (insertError) {
        throw new Error("Error inserting user: " + insertError.message);
      }
    }
  } catch (error) {
    console.error("Error storing user referral code:", error);
  }
};

// Logic for handling referral
export const referLogic = async (user) => {
  // Step 1: Get the user document from Firestore
  const userDoc = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    // Step 2: Retrieve the referral code (if exists)
    const referId = generateReferralCode();

    // Step 3: Check if the referral code exists, otherwise use some default logic
    if (referId) {
      // Step 4: Store the user's referral code in Supabase
      const result = await storeUserReferral(user.uid, referId);

      if (userSnapshot.exists()) {
        await updateDoc(userDoc, {
          referId: referId,
        });
        return referId;
      }

      console.log("Referral code stored successfully:", result);
      // if (!result.success) {
      //   console.error('Error while storing referral code:', result.error);
      // }
    } else {
      console.log("No referral code found for this user.");
    }
  } else {
    console.log("User not found in Firestore.");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
