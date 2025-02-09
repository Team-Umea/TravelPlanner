import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setIsAuthenticated,
  setStatus,
  setUsername,
  clearAuth,
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

  const resetAuth = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    ...authState,
    updateStatus,
    updateError,
    updateIsAuthenticated,
    updateUsername,
    resetAuth,
  };
};

export default useAuthStore;
