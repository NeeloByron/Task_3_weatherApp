import WeatherApp from "@/Components/WeatherApp"
import { Toaster } from 'react-hot-toast'
import.meta.env

function App() {
  
  return (
     <>
      <Toaster position="bottom-right" />
      <WeatherApp />
       
     </>
  )
}

export default App
