"use server";

const { supabase } = require("@/supabase");





export const checkReferralCodeExists = async (referralCode) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("referral_code")
      .eq("referral_code", referralCode)
      .single(); // Using .single() to expect only one result

    if (error) {
      // console.error("Error checking referral code:", error);
      return { success: false, message: "Error checking referral code. Please try again." };
    }

    if (data) {
      return { success: true, message: "Referral code is valid!" };
    } else {
      return { success: false, message: "Referral code is not valid." };
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const storeUserReferral = async (user_id, referral_code) => {
  
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
        throw new Error("Error updating user referral code: " + updateError.message);
      }
    } else {
      // Insert new user with referral code if user does not exist
      const { insertError } = await supabase
        .from("users")
        .insert({ user_id, referral_code });

      if (insertError) {
        throw new Error("Error inserting new user: " + insertError.message);
      }
    }

    return { success: true, message: "User referral code stored successfully." };
  } catch (err) {
    console.error("Unexpected error in storeUserReferral:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
};

// export const storeUserReferral = async (user_id, referral_code) => {
//   try {
//     // Check if the user already exists in the database
//     const { data, error } = await supabase
//       .from("users")
//       .select("user_id")
//       .eq("user_id", user_id);

//     if (error) {
//       throw new Error("Error checking user existence: " + error.message);
//     }

//     if (data.length > 0) {
//       // Update existing user's referral code if user exists
//       const { updateError } = await supabase
//         .from("users")
//         .update({ referral_code })
//         .eq("user_id", user_id);

//       if (updateError) {
//         throw new Error("Error updating referral code: " + updateError.message);
//       }
//     } else {
//       // Insert new user if user does not exist
//       const { insertError } = await supabase
//         .from("users")
//         .insert([{ user_id, referral_code }]);

//       if (insertError) {
//         throw new Error("Error inserting user: " + insertError.message);
//       }
//     }
//   } catch (error) {
//     console.error("Error storing user referral code:", error);
//   }
// };