import { useEffect } from 'react';
import { useWeather } from '@/Services/WeatherAPI';
import ErrorMessage from '@/Components/ErrorMessage'


export const WeatherForecast = () => {
  const { forecast, loading, error, fetchForecast } = useWeather();

  useEffect(() => {
    fetchForecast();
  }, []);
  
  if (loading) {
    return (
      <div className={'forecastCard'}>
        <div className={'forecastHeader'}>
          <div className={'forecastIcon'}>
              <i className="fa-solid fa-calendar-days calendarIcon"></i>
             </div>
            <h2 className={'forecastTitle'}>5 day forecast</h2>
          </div>

          <div className={'forecastList'}>
            <div className={'forecastItem'}>
             <div className={'forecastItemContent'}>
               <div className={'forecastItemInfo'}>
                <div className={'forecastItemDate'}>Loading forecast...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={fetchForecast} />;
    }
    if (!forecast || !forecast.list) {
      return (
       <div className={'forecastCard'}>
         <div className={'forecastHeader'}>
           <div className={'forecastIcon'}>
            <i className="fa-solid fa-calendar-days calendarIcon"></i>
           </div>
           <h2 className={'forecastTitle'}>5 day forecast</h2>
          </div>

          <div className={'forecastList'}>
            <div className={'forecastItem'}>
             <div className={'forecastItemContent'}>
               <div className={'forecastItemInfo'}>
                <div className={'forecastItemDate'}>No forecast data available</div>
                </div>
              </div>
            </div>
          </div>
       </div>
      );
    }
    
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0);
  return ( 
    <>
      <div className={'forecastCard'}>
        <div className={'forecastHeader'}>
          <div className={'forecastIcon'}>
            <i className={'fa-solid fa-calendar-days calendarIcon'}></i>
           </div>
            <h2 className={'forecastTitle'}>5 day forecast</h2>
         </div> 

         <div className={'forecastList'}>
          {dailyForecast.map((item, index) => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short'});
            const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric'});
            const temp = Math.round(item.main.temp);
            const feelsLike = Math.round(item.main.temp);
            const description = item.weather?.[0]?.description || 'weather description';
            const icon = item.weather?.[0]?.icon;
            const humidity = item.main.humidity
          
          return(
          <div className={'forecastItem'} key={index}>
            <div className={'forecastItemContent'}>
              <div className={'forecastItemIcon'}>
                {icon && (
                  <img src={`https://openweathermap.org/img/wn/${icon}.png`} 
                       alt={description}
                       style={{ width: '30px', height: '30px'}} />
                )}
                 <div className={'forecastItemInfo'}>
                  <div className={'forecastItemDate'}>
                     {dayName} <span className={'forecastDate'}>{monthDay}</span>
                    </div>
                    <div className={'forecastDescription'}>{description}</div>
                 </div>
              </div>
                 
                 <div className={'forecastItemDetails'}>
                   <div className={'forecastItemRain'}>
                     
                      <span className={'rainValue'}>
                       {humidity}%
                      </span>
                   </div>
                  <div className={'tempInfo'}>
                    <div className={'tempValue'}>{temp}°C</div>
                    <div className={'tempMain'}>Feels {feelsLike}°C</div>
                   </div>
                 </div>
               </div>
             </div>
             )
           })}
          </div>
       </div>
    </>
  );
}

export default WeatherForecast
