import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast';

export interface WeatherData {
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

export interface ForecastData {
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
    pop?: number;
  }>;
    city: {
      name: string;
      country: string;
    };
  }

export interface GeoCity {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: {
    [key: string]: string;
  };
}

export interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  isCached: boolean;
  units: 'metric' | 'imperial';
  setUnits: (units: 'metric' | 'imperial') => void;
  fetchWeather: (city? : string) => Promise<void>;
  fetchForecast: (city? : string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  searchCities: (query: string) => Promise<GeoCity[]>;
  clearError: () => void;
  refreshWeather: () => Promise<void>;
  getCachedData: (city: string) => { weather: WeatherData | null; forecast: ForecastData | null } | null;
}

 const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherAPI = ({ children }: { children: ReactNode}) => {
 const [weather, setWeather] = useState<WeatherData | null>(null);
 const [forecast, setForecast] = useState<ForecastData | null>(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [isCached, setIsCached] = useState(false);
 const [units, setUnitsState] = useState<'metric' | 'imperial'>(
    (localStorage.getItem('weather_units') as 'metric' | 'imperial') || 'metric'
  );

  const setUnits = (newUnits: 'metric' | 'imperial') => {
    localStorage.setItem('weather_units', newUnits);
    setUnitsState(newUnits);
  }
 
 const [lastFetchedCity, setLastFetchedCity] = useState<string>('');

    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const API_URL = import.meta.env.VITE_APP_API_URL;
    const GEO_URL = import.meta.env.VITE_APP_GEO_URL;
    const DEFAULT_CITY = import.meta.env.VITE_APP_DEFAULT_CITY || 'Polokwane';
    const CACHE_DURATION = 30 * 60 * 1000;

    const saveToCache = (city: string, weatherData: WeatherData, forecastData: ForecastData) => {
      try {
        const cacheData = {
          weather: weatherData,
          forecast: forecastData,
          timestamp: Date.now(),
          city: city,
        };
        localStorage.setItem(`weather_cache_${city.toLowerCase()}_${units}`, JSON.stringify(cacheData));
        setIsCached(false);
      } catch (err) {
        console.error('Error saving to cache:', err);
      }
    };

    const getCachedData = (city: string): { weather: WeatherData | null; forecast: ForecastData | null} | null => {
      try {
        const cached = localStorage.getItem(`weather_cache_${city.toLowerCase()}_${units}`);
        if (!cached) return null;

        const parsed = JSON.parse(cached);
        const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;

        if (isExpired) {
          localStorage.removeItem(`weather_cache_${city.toLowerCase()}_${units}`);
          return null;
        }

        return {
          weather: parsed.weather,
          forecast: parsed.forecast
        };
      } catch (err) {
        console.error('Error reading cache:', err);
        return null;
      }
    };

    const clearCache = (city?: string) => {
      if (city) {
        localStorage.removeItem(`weather_cache_${city.toLowerCase()}_${units}`);
      } else {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('weather_cache_')) {
            localStorage.removeItem(key);
          }
        });
      }
    };
 
  const fetchWeather = async (city?: string) => {
    {/*location*/}
    if (loading) return;
    const location = city || DEFAULT_CITY;
    setLastFetchedCity(location);

    const cachedData = getCachedData(location);
    if (cachedData && cachedData.weather) {
      setWeather(cachedData.weather);
      if (cachedData.forecast) {
        setForecast(cachedData.forecast);
      }

      setIsCached(true);
      setError(null);
      toast('Showing cached weather data (offline mode)', {
        duration: 3000,
        position: 'bottom-right',
        icon: '',
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsCached(false);

      const response = await fetch (
        `${API_URL}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=${units}`
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
    console.log('weather data:',location, data);

    await fetchForecast(location);

    if (forecast) {
      saveToCache(location, data, forecast);
    }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occured';
      setError(errorMessage);
      console.error('error:', err);

      const cachedData = getCachedData(location);
      if (cachedData && cachedData.weather) {
        setWeather(cachedData.weather);
        if (cachedData.forecast) {
          setForecast(cachedData.forecast);
        }
        setIsCached(true);
        setError('Showing cached data')
        console.log('using expired cache due to error');
      }
    } finally {
      setLoading(false);
    }
  };

 const fetchForecast = async (city?: string): Promise<ForecastData | null> => {
    const location = city || DEFAULT_CITY;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch (
        `${API_URL}/forecast?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=${units}&cnt=40`
        );

        if (!response.ok) {
          if (response.status === 404) throw new Error(`City "${location}" not found. Please check spelling.`);
          
        if (response.status === 401) throw new Error('Invalid API key. Please check your configurations. ');
  
        throw new Error('Forecast service is temporary unavailable. Please try again later');
      }

        const data: ForecastData = await response.json();
        setForecast(data);
        return data;

     } catch (err) {
       const errorMessage = err instanceof Error ? err.message : 'An unknown error occured';
       setError(errorMessage);
       return null;
     } finally {
       setLoading(false);
     }
   };

   const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      setIsCached(false);

      const response = await fetch (
          `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configurations. ');
        } else {
          throw new Error('Weather service is temporarily unavailable. Please try again later.');
        }
      }
      
      const data: WeatherData = await response.json();
      setWeather(data);
      console.log('Weather by coords: ', data);

      const forecastData = await fetchForecast(data.name);

      if (forecastData) {
        saveToCache(data.name, data, forecastData);
      }

    }  catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occured';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
     }
   };

   const searchCities = async (query: string): Promise<GeoCity[]> => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      setError(null);

      const response = await fetch (
        `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configurations. ');
        } else {
          throw new Error('City search service is temporarily unavailable.')
        }
      }

      const data: GeoCity[] = await response.json();
      return data.map((city) => ({
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        country: city.country,
        state: city.state || "",
        local_names: city.local_names
      }));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occured';
      setError(errorMessage);
      console.error('Error searching cities:', err);
      return [];
    }
   };

   const refreshWeather = async () => {
    if (lastFetchedCity) {
      clearCache(lastFetchedCity);
      await fetchWeather(lastFetchedCity);
    } else {
      await fetchForecast(DEFAULT_CITY);
    }
   }

  const clearError = () => setError(null);
   useEffect(() => {
    fetchWeather(DEFAULT_CITY);
    fetchForecast();
   }, []);

   useEffect(() => {
    return () => {
      clearCache();
    };
   }, []);

      useEffect(() => {
    if (lastFetchedCity) {
      fetchWeather(lastFetchedCity);
    }
   }, [units]);

  return (
      <>
        <WeatherContext.Provider value={{ weather, forecast, loading, error, isCached, units, setUnits, fetchWeather, fetchForecast, searchCities, fetchWeatherByCoords, clearError, refreshWeather, getCachedData, }}>
          {children}
        </WeatherContext.Provider>
      </>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be within a WeatherProvider');
  }
  return context;
}

export default WeatherAPI
