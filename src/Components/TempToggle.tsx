import React from 'react';
import { useWeather } from '@/Services/WeatherAPI';

export const TempToggle = () => {
  const { units, setUnits, loading } = useWeather();
  
  const toggleUnit = (unit: 'metric' | 'imperial') => {
    if (loading || unit === units) return;
    setUnits(unit);
  };
  return (
       <>
          <div className={'toggleBtnContainer'}>
            <button className={`toggleBtn ${units === 'metric' ? 'active' : ''}`}
                    onClick={() => toggleUnit('metric')}
                    aria-label={'switch to Celsius'}>°C</button>
            <button className={`toggleBtn ${units === 'imperial' ? 'active' : ''}`}
                    onClick={() => toggleUnit('imperial')}
                    aria-label={'Switch to Fahrenheit'}>°F</button>
          </div>
       </>
  )
}

export default TempToggle
