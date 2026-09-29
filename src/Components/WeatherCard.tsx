import React from "react"
import { useWeather } from '@/Services/WeatherAPI'
import WeatherAlerts from '@/Components/WeatherAlerts'
import ErrorMessage from './ErrorMessage';

// Display weather card data with loading, error and empty states
export const WeatherCard: React.FC = () => {
 const { weather, loading, error, fetchForecast, units} = useWeather();
 const unitSymbol = units === 'imperial' ? '°F' : '°C';

if (loading) {
  return <div className={'weatherCardContainer'}>loading....</div>;
}

if (error) {
    return <ErrorMessage message={error} onRetry={async () => { await fetchForecast?.(); }} />;
  }

 if (!weather) {
  return (
    <div className={'weatherCardContainer'}>
      <div className={'weatherCardHeader'}>
        <h2>No weather data</h2>
        <p>Search for a city to get started</p>
      </div>
    </div>
  );
 }

 // converts a country code to its english name, falling back to the code
 const getCountryName = (countryCode: string) => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region'}).of(countryCode) || countryCode;
  } catch {
    return countryCode;
  }
 };

  return (
      <>
       <div className={'weatherCardContainer'}>
         <WeatherAlerts onAlert={(message: string) => console.log('Alert', message)} />
           {/*Header*/}
           <div className={'weatherCardHeader'}>
             <div className={'headerLeft'}>
                 <div>
                   <h2>{weather.name}</h2>
                   <p>{weather?.sys?.country? getCountryName(weather.sys.country) : 'Unknown'}</p>
                 </div>
               </div>
            
               <div className={'headerRight'}>
                <div className={'date'}>
                  {new Date().toLocaleDateString('en-GB',{
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
               </div>
                <div className={'dateText'}>
                    {new Date().toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }).toUpperCase()} 
                </div>
             </div>
           </div>

           {/*Display */}
           <div className={'weatherMain'}>
             <div className={'weatherContent'}>
               <div className={'tempContain'}>{weather?.main?.temp !== undefined ? `${Math.round(weather.main.temp)}${unitSymbol}` : `--${unitSymbol}`}</div>
                <div className={'description'}>{weather?.weather?.[0]?.description || 'Weather description'}</div>
                 <div className={'range'}>
                   <span>Low: {weather?.main?.temp_min ? `${Math.round(weather.main.temp_min)}${unitSymbol}` : 'Minimum Temperature'}</span>
                   <span>High: {weather?.main?.temp_max ? `${Math.round(weather.main.temp_max)}${unitSymbol}` : 'Maximum Temperature'}</span>
                </div>
             </div>
             
             <div className={'weatherImg'}>
               {weather?.weather?.[0]?.icon && (
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description}
              /> )}
             </div>
           </div>

           <div className={'weatherGrid'}>
             <div className={'gridContainer'}>
               {/*Humidity*/}
               <div className={'gridItem'}>
                 <div className={'iconContent'}>
                   <div className={'gridIconHolder'}>
                     <div className={'iconBackground'}></div>
                      <i className="fa-solid fa-droplet humidityIcon"></i>
                       </div>
                    <div className={'statItem'}>
                    <div>
                     <span className={'statLabel'}>Humidity</span>
                  </div>
                     <div className={'statValue'}>{weather?.main?.humidity || '--'}%</div>
                 </div>
                </div>  
               </div>
                 
                 {/*wind speed*/}
               <div className={'gridItem'}>
                 <div className={'iconContent'}>
                   <div className={'gridIconHolder'}>
                      <div className={'iconBackground'}></div>
                        <i className="fa-solid fa-wind windIcon"></i>
                        </div>
                   <div className={'statItem'}>
                     <div>
                        <span className={'statLabel'}>Wind Speed</span>
                    </div>
                   <div className={'statValue'}>{weather?.wind?.speed || '--'} m/s</div>
                 </div>
                </div>  
               </div>

                {/*temperature*/}
               <div className={'gridItem'}>
                 <div className={'iconContent'}>
                   <div className={'gridIconHolder'}>
                      <div className={'iconBackground'}></div>
                        <i className="fa-solid fa-temperature-three-quarters feelsLikeIcon"></i>
                        </div>
                     <div className={'statItem'}>
                      <div>
                         <span className={'statLabel'}>Feels like</span>
                      </div>
                     <div className={'statValue'}>{weather?.main?.feels_like !== undefined ? `${Math.round(weather.main.feels_like)}${unitSymbol}` : '---'} </div>
                   </div>
                  </div>  
                 </div>
               </div>
          </div>
       </div>
      </>
  );
}

export default WeatherCard