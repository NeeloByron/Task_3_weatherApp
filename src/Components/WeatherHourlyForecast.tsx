
export const WeatherHourlyForecast = () => {
  return (
    <>
      <div className={'hourlyForecastContainer'}>
            <div className={'hourlyForecastCard'}>
             {/*header*/}
              <div className={'hourlyForecastHeader'}>
                   <div className={'hourlyForecastIcon'}>
                     <i className={'fa-solid fa-clock'}></i>
                   </div>
                  <h2 className={'hourlyForecastTitle'}>Hourly Forecast</h2>
              </div>

              {/*list*/}
              <div className={'hourlyForecastList'}>
                <div className={'hourlyForecastItem'}>
                  <div className={'hourlyForecastContent'}>
                    <div className={'hourlyBackground'}>
   
                     </div>

                     <div className={'hourlyTime'}>
                       <span>Time</span>
                     </div>
                     
                      <div className={'hourlyTemp'}>
                          <span>Temp</span>
                      </div>

                      <div className={'hourlyFeel'}>
                         <span>feels like</span>
                      </div>

                      <div className={'hourlyPercentage'}>
                        <span>10%</span>
                     </div>
                  </div>
                </div>
              </div> 
            </div> 
          </div> 
    </>
  )
}

export default WeatherHourlyForecast