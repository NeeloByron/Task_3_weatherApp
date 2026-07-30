import React, { useState, createContext } from "react";
import ReactSwitch from "react-switch";
import Search from '@/Components/Search'
import TempToggle from '@/Components/TempToggle'
import ErrorMessage from '@/Components/ErrorMessage'


interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext =  createContext<ThemeContextType | null>(null);

export const Header = () => {
    const [theme, setTheme] = useState("light");

   const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
   };
  return (
    <>
     <ThemeContext.Provider value={{ theme, toggleTheme}}>
       <div className={'main-container'} id={theme} >
        <div className={'content-container'}>
           {/*header*/}
          <div className={'header-container'}>
              <div className={'header-title'}>
                 <h1>Weather App</h1>
              </div>

             <div className={'switch-btn'}>
                <ReactSwitch onChange={toggleTheme}
                          checked={theme === "dark"}
                           checkedIcon={false}
                           uncheckedIcon={false}/>
              </div>
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

           </div>
         </div>
        </ThemeContext.Provider>
    </>
  )
}
