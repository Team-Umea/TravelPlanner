import axios from "axios";
import { PEXELS_API_KEY } from "../constants/constants";

const useImageApi = () => {
  const fetchImages = async (query) => {
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query,
          per_page: 10,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { fetchImages };
};

export default useImageApi;
