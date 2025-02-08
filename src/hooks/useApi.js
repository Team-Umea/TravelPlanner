import axios from "axios";
import { useEffect } from "react";

const useApi = (url, method, fetchOnRender) => {
  const callApi = async (requestBody) => {
    try {
      const config = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && { data: requestBody }),
      };

      return await axios(config);
    } catch (error) {
      console.error(error);
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
