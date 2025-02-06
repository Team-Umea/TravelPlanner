import axios from "axios";
import { DB_USERS_ENDPOINT } from "../constants/constants";

const useAuthDB = () => {
  //user have props username, email and password
  const signUp = async (user) => {
    try {
      const response = await axios.post(DB_USERS_ENDPOINT, user);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (user) => {
    try {
      const isEmail = user.includes("@");

      const response = await axios.get(DB_USERS_ENDPOINT, {
        params: {
          [isEmail ? "email" : "username"]: user,
        },
      });

      const userData = response.data;

      if (userData.length > 0) {
        // User found, handle successful sign-in
        console.log("User found:", userData);
      } else {
        // No user found
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return { signUp, signIn };
};

export default useAuthDB;
