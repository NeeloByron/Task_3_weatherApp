import React, { useState } from 'react'


export const WeatherAPI = () => {
 const [weather, setWeather] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 
  const fetchWeather = async (city?: string) => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const API_URL = import.meta.env.VITE_APP_API_URL;
    const DEFAULT_CITY = import.meta.env.VITE_APP_DEFAULT_CITY;
    const UNITS = import.meta.env.VITE_APP_UNITS;
    const GEO_URL = import.meta.env.VITE_APP_GEO_URL;
    
    const location = city || DEFAULT_CITY;

    try {
      setLoading(true);
      setError(null);
    }
  };
  return (
      <>
      
      </>
  )
}

export default WeatherAPI
