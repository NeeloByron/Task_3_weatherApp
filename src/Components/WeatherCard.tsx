import React from "react"
import locationImg from '@/Assets/location.png'


export const WeatherCard = () => {
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
                   <h2>Weather Name</h2>
                   <p>Weather Country</p>
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
                        <div className={'iconBackground'}>

                        </div>
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