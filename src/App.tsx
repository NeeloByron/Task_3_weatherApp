import React, { useState, createContext } from "react";
import ReactSwitch from "react-switch";
import searchIcon from "@/Assets/search-icon.png"

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext =  createContext<ThemeContextType | null>(null);

function App() {
  const [theme, setTheme] = useState("light");

   const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
   };
  return (
     <>
     <ThemeContext.Provider value={{ theme, toggleTheme}}>
       <div className={'main-container'} id={theme} >
           {/*header*/}
          <header className={'header-container'}>
             <div className={'header-title'}>
               <h1>Weather App</h1>
             </div>

             <div className={'switch-btn'}>
                <ReactSwitch onChange={toggleTheme}
                          checked={theme === "dark"}/>
             </div>
          </header>
            
            {/*body*/}
            <main>
              <div className={'search-container'}>
                  <img src={searchIcon} />
                  <input type={'text'} placeholder={'Search..'}  />
              </div>

              <div>

              </div>
            </main>

        </div>
        </ThemeContext.Provider>
     </>
   
  )
}

export default App
