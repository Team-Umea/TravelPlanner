import { createSlice } from "@reduxjs/toolkit";
import { USERNAME_LOCALSTORAGE_KEY } from "../constants/constants";

const initialState = {
  status: "idle",
  error: "",
  isAuthenticated: false,
  username: JSON.parse(localStorage.getItem(USERNAME_LOCALSTORAGE_KEY)) || "",
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
      state.isAuthenticated = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
      localStorage.setItem(USERNAME_LOCALSTORAGE_KEY, action.payload);
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
