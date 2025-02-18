import axios from "axios";
import { PEXELS_API_KEY } from "../constants/constants";

const useImageApi = () => {
  const fetchImages = async (query, perPage = 10) => {
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query,
          per_page: perPage,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchImage = (query) => fetchImages(query, 1);

  return { fetchImages, fetchImage };
};

export default useImageApi;