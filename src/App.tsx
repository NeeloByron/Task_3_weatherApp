import WeatherApp from "@/Components/WeatherApp"
import { Toaster } from 'react-hot-toast'
import.meta.env

// Renders the weather app and displays toast notificiations at the bottom right
function App() {
  
  return (
       <>
         <Toaster position="bottom-right" />
         <WeatherApp />
      </>
     )
   }

export default App
