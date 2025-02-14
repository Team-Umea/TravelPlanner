import axios from "axios";
import bcrypt from "bcryptjs";
import { DB_TRIPS_ENDPOINT, DB_USERS_ENDPOINT } from "../constants/constants";
import { generateID } from "../utils/utils";
import useAuthStore from "./useAuthStore";
import useApi from "./useApi";

const useAuthDB = () => {
  const { updateError, updateStatus, updateUserID } = useAuthStore();
  const { callApi: addNewTrip } = useApi(`${DB_TRIPS_ENDPOINT}`, "POST");

  const signUp = async (user) => {
    try {
      updateStatus("loading");
      updateError("");

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
        updateStatus("error");
        updateError("Username already exists!");
        return null;
      }

      if (emailExists) {
        console.error("Email already exists!");
        updateStatus("error");
        updateError("Email already exists!");
        return null;
      }

      if (user.username.length < 4) {
        console.error("Username must be minimum 8 characters long");
        updateStatus("error");
        updateError("Username must be minimum 8 characters long");
        return null;
      }

      if (user.password.length < 8) {
        console.error("Password must be minimum 8 characters long");
        updateStatus("error");
        updateError("Password must be minimum 8 characters long");
        return null;
      }

      const generatedID = generateID(existingUsers);

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = { ...user, password: hashedPassword, id: generatedID };

      await axios.post(DB_USERS_ENDPOINT, newUser);
      await addNewTrip({ id: generatedID, user: user.username, trips: [] });

      updateUserID(generatedID);

      return user;
    } catch (error) {
      updateError("Internal server error");
      updateStatus("error");
      console.error("Error during sign-up:", error);
      return null;
    }
  };

  const signIn = async (user) => {
    try {
      updateStatus("loading");
      updateError("");

      const isEmail = user.identifier.includes("@");

      const response = await axios.get(DB_USERS_ENDPOINT, {
        params: {
          [isEmail ? "email" : "username"]: user.identifier,
        },
      });

      const userData = response.data[0];

      if (userData) {
        const isPasswordValid = await bcrypt.compare(user.password, userData.password);
        if (isPasswordValid) {
          console.log(userData);

          updateUserID(userData.id);
          return userData;
        } else {
          console.error("Invalid password");
          updateError("Invalid password");
          updateStatus("error");
          return null;
        }
      } else {
        console.error("User not found");
        updateError("User not found");
        updateStatus("error");
        return null;
      }
    } catch (error) {
      updateError("Internal server error");
      updateStatus("error");
      console.error("Error during sign-in:", error);
      return null;
    }
  };

  return { signUp, signIn };
};

export default useAuthDB;
