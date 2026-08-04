import ReactSwitch from "react-switch";
import React, { useState, createContext, useContext } from "react";
import { ThemeContext } from "@/Components/WeatherApp"


export const Theme = () => {
   const context = useContext(ThemeContext);

   if (!context) return null;

   const { theme, toggleTheme } = context;
   const isDark = theme === "dark";

  return (
        <>
          <button type={'button'}
          className={'themeToggle'}
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>

          {/*sun*/}
          <div className={`segment-sun ${isDark ? "dark" : ""}`}>
            <svg 
              xmlns={'https://www.w3.org/2000/svg'}
              width={'16'}
              height={'16'}
              viewBox={'0 0 24 24'}
              fill={'none'}
              stroke={'currentColor'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              className={'lucide lucide-sun'}
              aria-hidden={'true'}>

              <circle cx={'12'} cy={'12'} r={'4'} />
              <path d={'M12 20v2'} />
              <path d={'m4.93 4.93 1.41 1.41'} />
              <path d={'m17.66 17.66 1.41 1.41'} />
              <path d={'M20 12h2'} />
              <path d={'m6.34 17.66-1.41 1.41'} />
              <path d={'m19.07 4.93-1.41 1.41'} />
              </svg>
            </div>
            
            {/*moon*/}
            <div className={`segment-moon ${isDark ? "dark" : ""}`}>
            <svg 
              xmlns={'https://www.w3.org/2000/svg'}
              width={'16'}
              height={'16'}
              viewBox={'0 0 24 24'}
              fill={'none'}
              stroke={'currentColor'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              className={'lucide lucide-moon'}
              aria-hidden={'true'}>

              <path d={'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401'} />
              </svg>
            </div>

            </button>
       </>
  )
}

export default Theme