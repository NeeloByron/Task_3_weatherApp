import WeatherApp from "@/Components/WeatherApp"
import { Toaster } from 'react-hot-toast'
import.meta.env

function App() {
  
  return (
     <>
      <Toaster position="top-right" />
      <WeatherApp toggleTheme={function (): void {
        throw new Error("Function not implemented.")
      } } />
       
     </>
  )
}

export default App
