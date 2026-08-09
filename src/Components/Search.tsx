import React, { useState } from 'react'
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
        <div className={'searchContainer'}>
          <form className={'formContainer'} onSubmit={handleSubmit}>
            <div className={'formGroup'}>
              <input className={'searchInput'}
                          type={'text'} 
                   placeholder={'Search for any city....'} 
                         value={query} 
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmit(e);}}}/>
              <button 
              className={'searchSubmitBtn'} 
              type={'submit'} 
              disabled={loading}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>      
                  <path d="M21 21l-4.3-4.3"/>
                </svg>
              )}
            </button>
            </div>
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
