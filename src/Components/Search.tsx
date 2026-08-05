import React, { useState } from 'react'
import TempToggle from '@/Components/TempToggle';
import { useWeather } from '@/Services/WeatherAPI';

interface GeoCity {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state? : string;
}

export const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWeather, searchCities, loading } = useWeather();
  
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setIsLoading(true);
      const results = await searchCities(value);
      setSuggestions(results);
      setIsLoading(false);
    } else {
      setSuggestions([]);
    }
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await fetchWeather(query);
      setQuery('');
      setSuggestions([]);
    }
   };  

   const handleSuggestionClick = async (city: GeoCity) => {
    await fetchWeather(city.name);
    setQuery('');
    setSuggestions([]);
   }

  return (
      <> 
        {/*search container*/}
        <div className={'search-container'}>
          <form className={'form-container'} onSubmit={handleSubmit}>
            <div className={'form-group'}>
              <i className={'fa-solid fa-magnifying-glass search-icon'}></i>
              <input className={'searchInput'} type={'text'} placeholder={'Search for any city....'} value={query} onChange={handleInputChange}/>
              <button className={'searchSubmitBtn'} type={'submit'} disabled={loading}>{loading ? '...' : 'Search'}</button>
            </div>
            <TempToggle />
          </form>
           
           {/*<div className={'searchDropDown'}>
            <div className={'searchLoading'}>
              <div className={'search-text'}>
                <div className={'loading-spainer'}></div>
                <p>Search City..</p>
              </div>
                search button
              <button className={'searchButton'}>
                <div className={'text-search'}>
                  City Name <span> City/State </span>
                  </div>
              <div className={'search-country'}>Country</div>
                  <search className={'searchInput'} />
                </button> 
            </div> */}
          </div>
      </>
  );
}

export default Search
