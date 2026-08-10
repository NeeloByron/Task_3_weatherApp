import Search from '@/Components/Search'
import React, { useState, createContext, useEffect } from "react";
import Navigation from "./Navigation";
import Theme from './Theme';
import WeatherCard from '@/Components/WeatherCard'
import WeatherForecast from '@/Components/WeatherForecast'
import { WeatherAPI, useWeather } from '@/Services/WeatherAPI'
import WeatherHourlyForecast from '@/Components/WeatherHourlyForecast'
import TempToggle from '@/Components/TempToggle';
import WeatherAlerts from '@/Components/WeatherAlerts'
import ErrorMessage from '@/Components/ErrorMessage'


interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface WeatherAppProps {
  initialTheme?: string;
}

export const ThemeContext =  createContext<ThemeContextType | null>(null);

const AutoDetectLocation: React.FC = () => {
  const { fetchWeather, fetchWeatherByCoords } = useWeather();

  useEffect(() => {
    if (navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Auto-detected location:', latitude, longitude);
          fetchWeatherByCoords(latitude, longitude);
        }, (error) => {
          console.log('location permission denied/error:', error.message);
          fetchWeather();
        }
      );
    } else {
      console.log('Geolocation not supported');
      fetchWeather();
    }
  }, []);
  return null;
};

export const WeatherApp = ({initialTheme= 'light'}: WeatherAppProps) => {
 const [theme, setTheme] = useState<string>(() => {

  const savedTheme = localStorage.getItem('theme');
  return savedTheme || initialTheme;
 });

 const toggleTheme = () => {
   setTheme(prev => {
    const newTheme = prev === 'light' ? 'dark' : 'light';

     localStorage.setItem('theme', newTheme);
     return newTheme
   });
 };

  return (
    <>
     <WeatherAPI>
      <ThemeContext.Provider value={{ theme, toggleTheme}}>
        <AutoDetectLocation />
         <div className={'main-container'} id={theme} >
           <div className={'content-container'}>

             {/*header*/}
              <div className={'headerContainer'}>
                 <Navigation /> 
                  {/*search component */}
                   <div className={'mainSearchContainer'}>
                      <Search />  
                   </div> 
                 
                 <div className={'headerContainerRight'}>
                   <TempToggle />
                   <Theme /> 
                 </div>
              </div>
 
            {/*Error condition 
             <div className={'errorContainer'}>
              <ErrorMessage />
             </div>*/}

             {/*Weather card */}
             <div className={'mainCardContainer'}>
                {/*weather forecast*/}
                  <div className={'forecastMain'}>
                    <WeatherCard />
                      <div className={'hourlyForecastContainer'}>
                        <WeatherHourlyForecast />
                      </div>
                    </div>

                 <div className={'forecastSideBar'}>
                  <WeatherForecast />
                </div>
              </div>
            </div>
          </div>
        </ThemeContext.Provider>
      </WeatherAPI>
    </>
  )
}
 
export default WeatherApp
