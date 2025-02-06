import axios from "axios";
import bcrypt from "bcryptjs";
import { DB_USERS_ENDPOINT } from "../constants/constants";
import { generateID } from "../utils/utils";

const useAuthDB = () => {
  const signUp = async (user) => {
    try {
      const response = await axios.get(DB_USERS_ENDPOINT);
      const existingUsers = response.data;

      const usernameExists = existingUsers.some(
        (existingUser) => existingUser.username.toLowerCase() === user.username.toLowerCase()
      );

      const emailExists = existingUsers.some(
        (existingUser) => existingUser.email.toLowerCase() === user.email.toLowerCase()
      );

      if (usernameExists) {
        console.error("Username already exists!");
        return;
      }

      if (emailExists) {
        console.error("Email already exists!");
        return;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = { ...user, password: hashedPassword, id: generateID(existingUsers) };

      const signUpResponse = await axios.post(DB_USERS_ENDPOINT, newUser);
      console.log("User signed up successfully:", signUpResponse.data);
    } catch (error) {
      console.error("Error during sign-up:", error);
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
        const isPasswordValid = await bcrypt.compare(user.password, userData[0].password);
        if (isPasswordValid) {
          console.log("User signed in successfully:", userData[0]);
        } else {
          console.error("Invalid password");
        }

        console.log("User found:", userData);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return { signUp, signIn };
};

export default useAuthDB;
