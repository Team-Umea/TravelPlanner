import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setIsAuthenticated,
  setStatus,
  setUsername,
  clearAuth,
  setUserID,
} from "../store/authSlice";
import { useCallback, useEffect } from "react";

const useAuthStore = (shouldReset) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (shouldReset) {
      updateStatus("");
      updateError("");
    }
  }, [shouldReset]);

  const updateStatus = (status) => {
    dispatch(setStatus(status));
  };

  const updateError = (error) => {
    dispatch(setError(error));
  };

  const updateIsAuthenticated = (isAuthenticated) => {
    dispatch(setIsAuthenticated(isAuthenticated));
  };

  const updateUsername = (username) => {
    dispatch(setUsername(username));
  };

  const updateUserID = (userID) => {
    dispatch(setUserID(userID));
  };

  const resetAuth = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    ...authState,
    updateStatus,
    updateError,
    updateIsAuthenticated,
    updateUsername,
    updateUserID,
    resetAuth,
  };
};

export default useAuthStore;
