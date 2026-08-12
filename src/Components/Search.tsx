import React, { useState, useRef, useEffect } from 'react'
import { useWeather } from '@/Services/WeatherAPI';
import toast from 'react-hot-toast';

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { fetchWeather, searchCities, loading, clearError } = useWeather();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    clearError();
    setShowSuggestions(true);

    if (value.length > 2) {
      setIsLoading(true);
      try {
      const results = await searchCities(value);
      setSuggestions(results);
      } catch (error) {
        console.error('Search error: ', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }

      } else {
      setSuggestions([]);
      setShowSuggestions(false);
      }
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      clearError();

    const promise = fetchWeather(query);
    {/*Promise toast*/}
      toast.promise (
        promise, 
        { 
          loading: `showing weather for ${query}....`,
          success: `Weather data loaded for ${query}...`,
          error: `Could not find ${query}. Please try again.`,
        },
        {
          duration: 4000,
          position: 'bottom-right'
        }  
      );  
      
       setQuery('');
       setSuggestions([]);
       setShowSuggestions(false);
    }
    };

   const handleSuggestionClick = async (city: GeoCity) => {
    clearError();

    const promise = fetchWeather(city.name);

    toast.promise(
      promise,
       {
         loading: `Fetching weather for ${city.name}...`,
         success: `Weather data loaded for ${city.name}`,
         error: `Could not find ${city.name}. Please try again.`,
       },
       {
         duration: 4000,
         position: 'bottom-right',
       }
    );

    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };
 
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
                      onFocus={() => setShowSuggestions(true)}
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
       {showSuggestions && suggestions.length > 0 && (
        <div className={'searchDropDown'}>
          {isLoading ? (
            <div className={'searchLoading'}>
              <div className={'loading-spinner'}></div>
              <p>Search city....</p>
            </div>
          ) : (
            suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
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
