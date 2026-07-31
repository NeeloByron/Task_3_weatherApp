import WeatherApp from "@/Components/WeatherApp"
import.meta.env

function App() {
  
  return (
     <>
      <WeatherApp toggleTheme={function (): void {
        throw new Error("Function not implemented.")
      } } />
       
     </>
  )
}

export default App
