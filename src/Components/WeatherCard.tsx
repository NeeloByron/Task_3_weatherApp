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
               <div className={'tempContain'}>Main Temp</div>
                <div className={'description'}>Weather Description</div>
                 <div className={'range'}>
                   <span>Maximum Temperature</span>
                   <span>Minimum Temperature</span>
                </div>
             </div>
             
             <div className={'weatherImg'}>
               {/* display */}
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
                     <span className={'statLabel'}>Stats Label</span>
                    </div>
                 <div className={'statValue'}>Stats Value</div>
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
                      <div className={'sunLabel'}>Sunrise</div>
                     </div>
                    <div className={'sunValue'}>
                       {/*display */}
                    </div>
                   </div>
                 </div>
            </div>
       </div>
      </>
  );
}

export default WeatherCard