import ReactSwitch from "react-switch";
import React, { useState, createContext, useContext } from "react";
import { ThemeContext } from "@/Components/WeatherApp"


export const Theme = () => {
   const context = useContext(ThemeContext);

   if (!context) return null;

  return (
        <>
            <div className={'switch-btn'}>
              <ReactSwitch onChange={context.toggleTheme}
                          checked={context.theme === "dark"}
                           checkedIcon={false}
                           uncheckedIcon={false}/>
            </div>
       </>
  )
}

export default Theme