import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_SESSIONSTORAGE_KEY,
  USERID_LOCALSTORAGE_KEY,
  USERNAME_LOCALSTORAGE_KEY,
} from "../constants/constants";

const initialState = {
  status: "idle",
  error: "",
  isAuthenticated: sessionStorage.getItem(AUTH_SESSIONSTORAGE_KEY) || false,
  username: localStorage.getItem(USERNAME_LOCALSTORAGE_KEY),
  userID: localStorage.getItem(USERID_LOCALSTORAGE_KEY) || -1,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsAuthenticated(state, action) {
      if (action.payload) {
        state.isAuthenticated = action.payload;
        sessionStorage.setItem(AUTH_SESSIONSTORAGE_KEY, action.payload);
      }
    },
    setUsername(state, action) {
      if (action.payload) {
        state.username = action.payload;
        localStorage.setItem(USERNAME_LOCALSTORAGE_KEY, action.payload);
      }
    },
    setUserID(state, action) {
      if (action.payload) {
        state.userID = action.payload;
        localStorage.setItem(USERID_LOCALSTORAGE_KEY, action.payload);
      }
    },
    clearAuth(state) {
      state.status = "idle";
      state.error = "";
      state.isAuthenticated = false;
      state.username = "";
      state.userID = -1;
      localStorage.setItem(USERNAME_LOCALSTORAGE_KEY, "");
      localStorage.setItem(USERID_LOCALSTORAGE_KEY, "");
      sessionStorage.setItem(AUTH_SESSIONSTORAGE_KEY, false);
    },
  },
});

export const { setStatus, setError, setIsAuthenticated, setUsername, setUserID, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
