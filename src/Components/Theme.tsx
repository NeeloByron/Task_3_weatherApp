import ReactSwitch from "react-switch";
import React, { useState, createContext } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext =  createContext<ThemeContextType | null>(null);

export const Theme = () => {
    const [theme, setTheme] = useState("light");

   const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
   };
  return (
        <>
          <ThemeContext.Provider value={{ theme, toggleTheme}}>
            <div className={'switch-btn'}>
              <ReactSwitch onChange={toggleTheme}
                          checked={theme === "dark"}
                           checkedIcon={false}
                           uncheckedIcon={false}/>
            </div>
          </ThemeContext.Provider>
       </>
  )
}

export default Theme