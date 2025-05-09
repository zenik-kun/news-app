import { useState, useCallback } from "react";
import { fetchWeather } from "../services/weatherApi";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = useCallback(async (location) => {
    if (!location || location.trim() === "") {
      setError("Please enter a location.");
      setWeatherData(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(location);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data. Please try again.");
      setWeatherData(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    loading,
    error,
    getWeather,
  };
};