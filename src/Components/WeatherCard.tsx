import React from "react"
import locationImg from '@/Assets/location.png'
import { useWeather } from '@/Services/WeatherAPI'


export const WeatherCard = () => {
 const { weather, loading, error, fetchWeather } = useWeather();

  React.useEffect(() => {
  fetchWeather();
}, []);

if (loading) {
  return <div className={'weatherCardContainer'}>loading....</div>;
}
 if (error) {
  return <div className={'weatherCardContainer'} style={{color: '#f87171'}}>{error}</div>
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

  return (
      <>
       <div className={'weatherCardContainer'}>
           {/*Header*/}
           <div className={'weatherCardHeader'}>
             <div className={'headerLeft'}>
                <div className={'iconHolder'}>
                   <img src={locationImg} alt={'icon'}/>
                 </div>
                 <div>
                   <h2>{weather.name}</h2>
                   <p>{weather?.sys?.country === 'ZA' ? new Intl.DisplayNames(['en'], {type: 'region'}).of(weather.sys.country) : 'Unknown'}</p>
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
                      hour12: false
                    })} SAST
                </div>
             </div>
           </div>

           {/*Display */}
           <div className={'weatherMain'}>
             <div className={'weatherContent'}>
               <div className={'tempContain'}>{weather?.main?.temp !== undefined ? `${Math.round(weather.main.temp)}°C` : '--°C'}</div>
                <div className={'description'}>{weather?.weather?.[0]?.description || 'Weather description'}</div>
                 <div className={'range'}>
                   <span>Low: {weather?.main?.temp_min ? `${Math.round(weather.main.temp_min)}°C` : 'Minimum Temperature'}</span>
                   <span>High: {weather?.main?.temp_max ? `${Math.round(weather.main.temp_max)}°C` : 'Maximum Temperature'}</span>
                </div>
             </div>
             
             <div className={'weatherImg'}>
               {weather?.weather?.[0]?.icon && (
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description}/> )}
             </div>
           </div>

           <div className={'weatherGrid'}>
             <div className={'gridContainer'}>
               {/*Humidity*/}
               <div className={'gridItem'}>
                 <div className={'iconContent'}>
                   <div className={'gridIconHolder'}>
                     <div className={'iconBackground'}></div>
                      {/*display humidity icon*/}
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
                        </div>
                     <div className={'statItem'}>
                      <div>
                         <span className={'statLabel'}>Temperature</span>
                      </div>
                     <div className={'statValue'}>{weather?.wind?.speed || '--'} m/s</div>
                   </div>
                  </div>  
                 </div>
               </div>

                {/*sun time*/}
               <div className={'sunGrid'}>
                 <div className={'sunCard'}>
                    <div className={'sunHeader'}>
                      <div className={'sunIcon'}>
                         <i className={'fa-solid fa-sun sunIcon'}></i>
                       </div>
                      <span className={'sunLabel'}>Sunrise</span>
                      </div>
                        <div className={'sunValue'}>
                          {weather?.sys?.sunrise? new Date(weather.sys.sunrise * 1000). toLocaleTimeString() : '--'}
                        </div>
                      </div>

                    <div className="sunCard">
                    {/*night time*/}
                    <div className="sunHeader">
                      <div className="sunIcon">
                        <i className="fa-solid fa-moon"></i>
                      </div>
                    <span className="sunLabel">Sunset</span>
                  </div>
                <div className="sunValue">
                  {weather.sys?.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : '--'}
                </div>
              </div>
            </div>
          </div>

          <div className={'hourlyForecastContainer'}>
            <div className={'hourlyForecastCard'}>
              {/*header*/}
              <div className={'hourlyForecastHeader'}>
                   <div className={'hourlyForecastIcon'}>
                     <i className={'fa-solid fa-clock'}></i>
                   </div>
                  <h2 className={'hourlyForecastTitle'}>Hourly Forecast</h2>
              </div>

              {/*list
              <div className={'hourlyForecastList'}>
                <div className={'hourlyForecastItem'}>
                  <div className={'hourlyForecastContent'}>
                    <div className={'hourlyBackground'}>
   
                    </div>

                    <div>
                      
                    </div>
                  </div>
                </div>
              </div> */}
            </div> 
          </div>
      </div>
      </>
  );
}

export default WeatherCard