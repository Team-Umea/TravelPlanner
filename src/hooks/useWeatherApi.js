import axios from "axios";
import { OPENWEATHERMAP_API_KEY, WEATHER_API_KEY } from "../constants/constants";

const useWeatherApi = () => {
  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
        params: {
          key: WEATHER_API_KEY,
          q: location,
          aqi: "no",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { fetchWeatherData };
};

export default useWeatherApi;
