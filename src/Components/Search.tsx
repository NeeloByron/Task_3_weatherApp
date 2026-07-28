import React from 'react'
import searchIcon from "@/Assets/search-icon.png"

export const Search = () => {
  return (
      <>
        {/*body*/}
           
                <div className={'search-container'}>
                  <img src={searchIcon} />
                  <input type={'text'} placeholder={'Search..'}  />
                  <button className={'closeBtn'}>x</button>
               </div>
      </>
  )
}

export default Search
