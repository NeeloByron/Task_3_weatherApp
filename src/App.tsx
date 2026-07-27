import React, { useState, createContext } from "react";
import ReactSwitch from "react-switch";

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
          <header className={'header-container'}>
             <h1>Weather App</h1>
             <ReactSwitch onChange={toggleTheme}
                          checked={theme === "dark"}/>
          </header>
        </div>
        </ThemeContext.Provider>
     </>
   
  )
}

export default App
