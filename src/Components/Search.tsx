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
              <button className={'searchSubmitBtn'} type={'submit'} disabled={loading}>{loading ? '...' : 'Search'}</button>
              {/*<i className={'fa-solid fa-magnifying-glass search-icon'}></i>*/}
              <input className={'searchInput'} type={'text'} placeholder={'Search for any city....'} value={query} onChange={handleInputChange}/>
              
            </div>
            <TempToggle />
          </form>
           
      {/* Dropdown suggestions */}
       {suggestions.length > 0 && (
        <div className={'searchDropDown'}>
          {isLoading ? (
            <div className={'searchLoading'}>
              <div className={'loading-spinner'}></div>
              <p>Search city....</p>
            </div>
          ) : (
            suggestions.map((city, index) => (
              <button
                key={index}
                className={'searchButton'}
                onClick={() => handleSuggestionClick(city)}
              >
                <div className={'text-search'}>
                  {city.name} 
                  {city.state && <span> {city.state}</span>}
                </div>
                <div className={'search-country'}>{city.country}</div>
              </button>
              
            ))
          )}
        </div>
      )}
    </div>

      </>
  );
}

export default Search
