import Search from '@/Components/Search'
import React, { useState, createContext, useEffect } from "react";
import Navigation from "./Navigation";
import Theme from './Theme';
import WeatherCard from '@/Components/WeatherCard'
import WeatherForecast from '@/Components/WeatherForecast'
import { WeatherAPI, useWeather } from '@/Services/WeatherAPI'
import WeatherHourlyForecast from '@/Components/WeatherHourlyForecast'
import TempToggle from '@/Components/TempToggle';

// Describes the theme values shared with other components
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// allows the parent to provide a starting time 
interface WeatherAppProps {
  initialTheme?: string;
}

// creates a shared place for the same and its toggle function
export const ThemeContext =  createContext<ThemeContextType | null>(null);
// Detect the user's location without displaying anything 
const AutoDetectLocation: React.FC = () => {
  const { fetchWeather, fetchWeatherByCoords } = useWeather();

  useEffect(() => {
    // check whether the browser supports location detection
    if (navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // get the coordinates returned by the browser
          const { latitude, longitude } = position.coords;
          console.log('Auto-detected location:', latitude, longitude);
          fetchWeatherByCoords(latitude, longitude);
        }, (error) => {
          // if location detection fails, use the hook's fallback behavior
          console.log('location permission denied/error:', error.message);
          fetchWeather();
        }
      );
    } else {
      // use the fallback when geolocation is unavailable 
      console.log('Geolocation not supported');
      fetchWeather();
    }
  }, []);
  // this component performs a task but has no visible interface
  return null;
};

export const WeatherApp = ({initialTheme= 'light'}: WeatherAppProps) => {
  // use the saved theme or the starting theme if none is saved
  const [theme, setTheme] = useState<string>(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme || initialTheme;
 });

 const toggleTheme = () => {
   setTheme(prev => {
    const newTheme = prev === 'light' ? 'dark' : 'light';
     // remember the selection for the next visit
     localStorage.setItem('theme', newTheme);
     return newTheme
   });
 };

  return (
    <>
    {/* make the weather context available to the component inside */}
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
