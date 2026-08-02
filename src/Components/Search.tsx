import React from 'react'



export const Search = () => {
  return (
      <> 
        {/*search container*/}
        <div className={'search-container'}>
          <form className={'form-container'}>
            <div className={'form-group'}>
              <i className={'fa-solid fa-magnifying-glass search-icon'}></i>
              <input className={'searchInput'} type={'text'} placeholder={'Search for any city....'} />
            </div>
          </form>
           
          <div className={'searchDropDown'}>
            <div className={'searchLoading'}>
              <div className={'search-text'}>
                <div className={'loading-spainer'}></div>
                <p>Search City..</p>
              </div>
                 {/*search button*/}
              <button className={'searchButton'}>
                <div className={'text-search'}>
                  City Name <span> City/State </span>
                  </div>
              <div className={'search-country'}>Country</div>
                  <search className={'searchInput'} />
                </button>
            </div>
          </div>
          
        </div>
         
      </>
  );
}

export default Search
