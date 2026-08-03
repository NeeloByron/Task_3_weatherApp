import React from "react"
import locationImg from '@/Assets/location.png'
import sunImg from '@/Assets/sunny.png'
import WeatherAPI, { useWeather } from '@/Services/WeatherAPI'


export const WeatherCard = () => {
 const { weather, loading, error, fetchWeather } = useWeather();

  React.useEffect(() => {
  fetchWeather();
}, []);

if (loading) {
  return <div className={'weatherCardContainer'}>loading....</div>;
}
 if (error) {
  return <div className={'weatherCardContainer'}>{error}</div>
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
                   <h2>{weather?.name || 'Weather Name'}</h2>
                   <p>{weather?.sys?.country}</p>
                </div>
             </div>
            
             <div className={'headerRight'}>
               <div className={'date'}>
                {/* display */}
               </div>
                <div className={'dateText'}>
                    {/* display */}
                </div>
             </div>
           </div>

           {/*Display */}
           <div className={'weatherMain'}>
             <div className={'weatherContent'}>
               <div className={'tempContain'}>{weather?.main?.temp ? `${Math.round(weather.main.temp)}°C` : 'Main temp'}</div>
                <div className={'description'}>{weather?.weather?.[0]?.description || 'Weather description'}</div>
                 <div className={'range'}>
                   <span>{weather?.main?.temp_min ? `${Math.round(weather.main.temp_min)}°C` : 'Minimum Temperature'}</span>
                   <span>{weather?.main?.temp_max ? `${Math.round(weather.main.temp_max)}°C` : 'Maximum Temperature'}</span>
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
               {/*display*/}
               <div className={'gridItem'}>
                 <div className={'iconContent'}>
                    <div className={'gridIconHolder'}>
                        <div className={'iconBackground'}></div>
                        </div>

                   <div className={'statItem'}>
                    <div>
                     <span className={'statLabel'}>Humanity</span>
                    </div>
                 <div className={'statValue'}>{weather?.main?.humidity || '--'}%</div>
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
                      <div className={'sunLabel'}>Wind Speed</div>
                     </div>
                    <div className={'sunValue'}>
                       {weather?.wind?.speed || '--'} m/s
                    </div>
                   </div>
                 </div>
            </div>
       </div>
      </>
  );
}

export default WeatherCard