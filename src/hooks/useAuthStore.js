import { useDispatch, useSelector } from "react-redux";
import { setError, setIsAuthenticated, setStatus, setUsername } from "../store/authSlice";
import { useEffect } from "react";

const useAuthStore = (shouldReset) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (shouldReset) {
      clearAuth();
    }
  }, []);

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

  const clearAuth = () => {
    dispatch(clearAuth());
  };

  return {
    ...authState,
    updateStatus,
    updateError,
    updateIsAuthenticated,
    updateUsername,
    clearAuth,
  };
};

export default useAuthStore;
