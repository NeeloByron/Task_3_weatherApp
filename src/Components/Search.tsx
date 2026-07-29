import React from 'react'
import searchIcon from "@/Assets/search-icon.png"

export const Search = () => {
  return (
      <>
        <div className={'search-container'}>
          <form className={'form-container'}>
            <div className={'form-group'}>
              <img src={searchIcon} />
              <input type={'text'} placeholder={'Search for any city....'}  />
              <button className={'closeBtn'}>X</button>
            </div>
          </form>
        </div>
      </>
  )
}

export default Search
