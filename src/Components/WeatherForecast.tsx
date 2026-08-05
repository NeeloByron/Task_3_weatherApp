import React, { useEffect } from 'react';
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
          
          <div className={'forecastItem'}>
            <div className={'forecastItemContent'}>
              <div className={'forecastItemIcon'}>
                {/*display*/}
                 <div className={'forecastItemInfo'}>
                  <div className={'forecastItemDate'}>
                     {/*conditional date*/}
                    </div>
                    <div className={'forecastDescription'}>Weather Description</div>
                 </div>
              </div>
                 
                 <div className={'forecastItemDetails'}>
                  <div className={'forecastItemRain'}>
                    <i className={'fa-solid fa-cloud-rain'}></i>
                    <span className={'rainValue'}>
                      {/*dynamic details*/}
                    </span>
                  </div>
                  <div className={'tempInfo'}>
                    <div className={'tempValue'}>Temperature</div>
                    <div className={'tempMain'}>Main Temp</div>
                  </div>
                 </div>
              </div>
            </div>
          
         </div>
      </div>
    </>
  );
}

export default WeatherForecast
