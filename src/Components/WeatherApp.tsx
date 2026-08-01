import Search from '@/Components/Search'
import TempToggle from '@/Components/TempToggle'
import ErrorMessage from '@/Components/ErrorMessage'
import React, { useState, createContext } from "react";
import Navigation from "./Navigation";
import Theme from './Theme';
import WeatherCard from '@/Components/WeatherCard'

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface WeatherAppProps {
  initialTheme?: string;
  toggleTheme: () => void;
}

export const ThemeContext =  createContext<ThemeContextType | null>(null);

export const WeatherApp = ({initialTheme= "light"}: WeatherAppProps) => {
 const [theme, setTheme] = useState<string>(initialTheme); 

 const toggleTheme = () => {
   setTheme(prev => prev === "light" ? "dark" : "light");
 };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme}}>
        <div className={'main-container'} id={theme} >
          <div className={'content-container'}>
            {/*header*/}
             <div className={'header-container'}>
                <Navigation /> 
                <Theme /> 
             </div>

           {/*search component
            <div className={'main-search-container'}>
                   <Search />
             <div className={'tempToggle-main'}>      
                   <TempToggle />
              </div>     
            </div> */}

            {/*Error condition
            <div className={'errorContainer'}>
              <ErrorMessage />
            </div> */}

            {/*Weather card */}
             <div className={'main-card-container'}>
              <div className={'main-card-content'}>
                <div className={'card-content'}>
                  <WeatherCard />
                </div>

                {}
              </div>
             </div>

           </div>
         </div>
        </ThemeContext.Provider>
    </>
  )
}
 
export default WeatherApp
