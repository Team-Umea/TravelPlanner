import axios from "axios";

const useImageApi = (query) => {
  const fetchImages = async () => {
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: API_KEY,
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
