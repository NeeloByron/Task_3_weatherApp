import React from 'react'


export const WeatherAPI = () => {
  const fetchWeather = async () => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const API_URL = import.meta.env.VITE_APP_API_URL;
    const API_DEFAULT_CITY = import.meta.env.VITE_APP_DEFAULT_CITY;
    const UNITS = import.meta.env.VITE_APP_UNITS;
    const GEO_URL = import.meta.env.VITE_APP_GEO_URL;

    const response = await fetch(
      `${API_URL}/weather?q=${API_DEFAULT_CITY}&appid=${API_KEY}&unitS=${UNITS}`
    );
    const data = await response.json();
    console.log(data);
  }
  return (
      <>
        <button onClick={fetchWeather}>fetch weather</button>
      </>
  )
}

export default WeatherAPI
