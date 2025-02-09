import { createSlice } from "@reduxjs/toolkit";
import { AUTH_SESSIONSTORAGE_KEY, USERNAME_LOCALSTORAGE_KEY } from "../constants/constants";

const initialState = {
  status: "idle",
  error: "",
  isAuthenticated: (() => {
    try {
      const auth = JSON.parse(sessionStorage.getItem(AUTH_SESSIONSTORAGE_KEY));
      return auth || false;
    } catch (error) {
      return false;
    }
  })(),
  username: (() => {
    try {
      const name = JSON.parse(localStorage.getItem(USERNAME_LOCALSTORAGE_KEY));
      return name || "";
    } catch (error) {
      return "";
    }
  })(),
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
    clearAuth(state) {
      state.status = "idle";
      state.error = "";
      state.isAuthenticated = false;
      state.username = "";
      localStorage.setItem(USERNAME_LOCALSTORAGE_KEY, "");
    },
  },
});

export const { setStatus, setError, setIsAuthenticated, setUsername, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
