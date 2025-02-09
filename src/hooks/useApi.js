import axios from "axios";
import { useEffect } from "react";

const useApi = (url, method, cacheKey, fetchOnRender) => {
  const callApi = async (requestBody, setStatus, setError) => {
    try {
      setStatus && setStatus("loading");
      setError && setError("");

      if (cacheKey) {
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          return cachedData;
        }
      }

      const config = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && { data: requestBody }),
      };

      const response = await axios(config);

      setStatus && setStatus("success");

      return response;
    } catch (error) {
      console.error(error);
      setError && setError(error.response?.data.message || error.message);
      return null;
    }
  };

  useEffect(() => {
    if (fetchOnRender) {
      callApi();
    }
  }, [fetchOnRender]);

  return { callApi };
};

export default useApi;
