import { useWeather } from "@/Services/WeatherAPI";
import type { ForecastData } from '@/Services/WeatherAPI';
import React from "react";

type ForecastListItem = ForecastData['list'][0];

export const WeatherHourlyForecast: React.FC = () => {
  const { forecast, loading } = useWeather();

  if (loading) {
    return(
      <div className={'hourlyForecastCard'}>
             {/*header*/}
         <div className={'hourlyForecastHeader'}>
           <div className={'hourlyForecastIcon'}>
              <i className={'fa-solid fa-clock'}></i>
                </div>
                 <h2 className={'hourlyForecastTitle'}>24hrs Forecast</h2>
              </div>
             <div className={'hourlyForecastLoading'}>
              <div className={'loadingSpinner'}></div>
             <p>Loading forecast....</p>
         </div>
      </div>
    );
  }

  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return (
         <div className={'hourlyForecastCard'}>
           {/*header*/}
             <div className={'hourlyForecastHeader'}>
               <div className={'hourlyForecastIcon'}>
                   <i className={'fa-solid fa-clock'}></i>
                   </div>
                 <h2 className={'hourlyForecastTitle'}>24hrs Forecast</h2>
              </div>

            <div className={'hourlyForecastLoading'}>
              <div className={'loadingSpinner'}></div>
                <p>No hourly data avaiab</p>
            </div>
        </div>
     );
   }

   const formatTime = (timeStamp: number): string => {
    const date = new Date(timeStamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }); 
   };

   const formatDate = (timeStamp: number): string => {
    const date = new Date(timeStamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
   };

   const getNext24Hours = (): ForecastListItem[] => {
    const now = new Date();
    const currentHour: number = now.getHours();
    const currentMinutes: number = now.getMinutes();
    const currentTime: number = currentHour + (currentMinutes / 60);

    let startIndex: number = 0;
    let minDiff: number = Infinity;

    forecast.list.forEach((item: ForecastListItem, index: number) => {
      const itemDate: Date = new Date(item.dt * 1000);
      const itemHour: number = itemDate.getHours();
      const itemMinutes: number = itemDate.getMinutes();
      const itemTime: number = itemHour + (itemMinutes / 60);

      let diff: number = itemTime - currentTime;
      if (diff < 0) diff += 24;

      if (diff < minDiff) {
        minDiff = diff;
        startIndex = index;
      }
    });

    const next8: ForecastListItem[] = [];
    for (let i: number = 0; i < 8; i++) {
      const index: number = (startIndex + i) % forecast.list.length;
      next8.push(forecast.list[index]);
    }

    return next8;
  };

    const next24Hours: ForecastListItem[] = getNext24Hours();

    const firstRow: ForecastListItem[] = next24Hours.slice(0, 4);
    const secondRow: ForecastListItem[] = next24Hours.slice(4, 8);

    const startDate: number | undefined = next24Hours[0]?.dt;
    const endDate: number | undefined = next24Hours[7]?.dt;
  
  return (
    <>
      <div className={'hourlyForecastCard'}>
        {/* Header */}
          <div className={'hourlyForecastHeader'}>
             <div className={'hourlyForecastIcon'}>
               <i className={'fa-solid fa-clock'}></i>
             </div>
           <h2 className={'hourlyForecastTitle'}>24-Hour Forecast</h2>
           {startDate && endDate && (
           <span className={'hourlyForecastSubtitle'}>
            {formatDate(startDate)} - {formatDate(endDate)}
            </span>
            )}
          </div>
            {/* 2 rows */}
        <div className={'hourlyForecastGrid'}>
          {/*first row*/}
          <div className={'hourlyForecastRow'}>
           {firstRow.map((hour: ForecastListItem, index: number) => (
             <div key={index} className={'hourlyForecastItem'}>
              <div className={'hourlyForecastContent'}>
                 {/*time*/}
                  <div className={'hourlyTime'}>
                    <span>{formatTime(hour.dt)}</span>
                  </div>
                 
                  {/* Weather Icon */}
                <div className={'hourlyWeatherIcon'}>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt={hour.weather[0].description}
                    className={'hourlyIcon'}
                    loading="lazy"
                  />
                </div>

                {/* Temperature */}
                <div className={'hourlyTemp'}>
                  <span>{Math.round(hour.main.temp)}°</span>
                </div>

                {/* Feels Like */}
                <div className={'hourlyFeel'}>
                  <span>Feels {Math.round(hour.main.feels_like)}°</span>
                </div>

                {/* Rain/Precipitation */}
                <div className={'hourlyPercentage'}>
                  <span>{hour.pop ? Math.round(hour.pop * 100) : 0}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className={'hourlyForecastRow'}>
          {secondRow.map((hour: ForecastListItem, index: number) => (
            <div key={index + 4} className={'hourlyForecastItem'}>
              <div className={'hourlyForecastContent'}>
                {/* Time */}
                <div className={'hourlyTime'}>
                  <span>{formatTime(hour.dt)}</span>
                </div>

                {/* Weather Icon */}
                <div className={'hourlyWeatherIcon'}>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt={hour.weather[0].description}
                    className={'hourlyIcon'}
                    loading="lazy"
                  />
                </div>

                {/* Temperature */}
                <div className={'hourlyTemp'}>
                  <span>{Math.round(hour.main.temp)}°</span>
                </div>

                {/* Feels */}
                <div className={'hourlyFeel'}>
                  <span>Feels {Math.round(hour.main.feels_like)}°</span>
                </div>

                {/* Rain */}
                <div className={'hourlyPercentage'}>
                  <span>{hour.pop ? Math.round(hour.pop * 100) : 0}%</span>
                </div>

              </div>
             </div>
           ))}
         </div>  
        </div>
     </div>
    </>
  )
}

export default WeatherHourlyForecast