import { WEATHER_API_KEY } from "@env";

const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (location) => {
  if (!location) {
    throw new Error("Location is required to fetch weather data.");
  }
  try {
    const response = await fetch(`${BASE_URL}?key=${WEATHER_API_KEY}&q=${location}&aqi=yes`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};