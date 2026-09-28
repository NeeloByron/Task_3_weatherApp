import { useWeather } from '@/Services/WeatherAPI';

export const TempToggle = () => {
  // Get the selected units, the function to change them and weather is currently loading
  const { units, setUnits, loading } = useWeather();
  
  const toggleUnit = (unit: 'metric' | 'imperial') => {
    if (loading || unit === units) return;
    // Update the selected temperature units
    setUnits(unit);
  };
  return (
       <>
          <div className={'toggleBtnContainer'}>
            {/* select celsius and highlight it when active */}
            <button className={`toggleBtn ${units === 'metric' ? 'active' : ''}`}
                    onClick={() => toggleUnit('metric')}
                    aria-label={'switch to Celsius'}>°C</button>
             {/* select fahrenheit and highlight it when active */}
            <button className={`toggleBtn ${units === 'imperial' ? 'active' : ''}`}
                    onClick={() => toggleUnit('imperial')}
                    aria-label={'Switch to Fahrenheit'}>°F</button>
          </div>
       </>
  )
}

export default TempToggle

// units - remembers which switch is selected
// setUnits(unit) - changes the selection
// loading - prevents switching while the weather request is busy
