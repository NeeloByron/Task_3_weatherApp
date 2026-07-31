import React from "react"
import locationImg from '@/Assets/location.png'


export const WeatherCard = () => {
  return (
      <>
       <div className={'weatherCardContainer'}>
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
       </div>
      </>
  );
}

export default WeatherCard