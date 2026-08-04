
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  }
  
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>; 
   
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  coord: {
    lat: number;
    lon: number;
  }
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    weather: Array <{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
    city: {
      name: string;
      country: string;
    };
  }


interface GeoCity {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city? : string) => Promise<void>;
  fetchForecast: (city? : string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  searchCities: (query: string) => Promise<GeoCity[]>;
  clearError: () => void;
}

 const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherAPI = ({ children }: { children: ReactNode}) => {
 const [weather, setWeather] = useState<WeatherData | null>(null);
 const [forecast, setForecast] = useState<WeatherData | null>(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 
  const fetchWeather = async (city?: string) => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const API_URL = import.meta.env.VITE_APP_API_URL;
    const DEFAULT_CITY = import.meta.env.VITE_APP_DEFAULT_CITY;
    const UNITS = import.meta.env.VITE_APP_UNITS;
  
    
    {/*location*/}
    const location = city || DEFAULT_CITY;
    try {
      setLoading(true);
      setError(null);

      const response = await fetch (
        `${API_URL}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=${UNITS}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${location}" not found. Please check spelling.`);
        } else if (response.status === 401) {
          throw new Error(`invalid API Key. Please check your configurations.`);
        } else {
          throw new Error('weather service is temporarily unavaiable. Please try again later.');
        }
      }

    const data = await response.json();
    setWeather(data);
    console.log('weather data:', data);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occured';
      setError(errorMessage);
      console.error('error:', err);
    } finally {
      setLoading(false);
    }
  };

 /* const fetchForecast = async (city?: string) => {
    const location = city || DEFAULT_CITY;

    try {
      setLoading(true);
      setError(null);
    }
  }*/

  const fetchGeolocation = async (city: string) => {
    const GEO_URL = import.meta.env.VITE_APP_GEO_URL;
    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    try {
        const response = await fetch (
          `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const data = await response.json();
        return data[0];
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const clearError = () => setError(null);
  return (
      <>
        <WeatherContext.Provider value={{ weather, loading, error, fetchWeather, fetchGeolocation, clearError }}>
          {children}
        </WeatherContext.Provider>
      </>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be within a WeatherProvider');
  }
  return context;
}

export default WeatherAPI
