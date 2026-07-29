import React from 'react'
import searchIcon from "@/Assets/search-icon.png"

export const Search = () => {
  return (
      <> 
        {/*search container*/}
        <div className={'search-container'}>
          <form className={'form-container'}>
            <div className={'form-group'}>
              <img src={searchIcon} />
              <input type={'text'} placeholder={'Search for any city....'}  />
              <button className={'closeBtn'}>x</button>
            </div>
          </form>
           
          <div className={'searchDropDown'}>
            <div className={'search'}>
              <div className={''}>
                <p>Search Cities..</p>
              </div>
            </div>
          </div>
          
        </div>
      </>
  );
}

export default Search
