import React, { useState, useRef, useEffect } from 'react'
import { useWeather } from '@/Services/WeatherAPI';
import toast from 'react-hot-toast';

// Describe the information stored for each city suggestion
interface GeoCity {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state? : string; // some cities might not have state
}

export const Search = () => {
  const [query, setQuery] = useState(''); // store what the user types
  const [suggestions, setSuggestions] = useState<GeoCity[]>([]); // Store the cities returned by search
  const [isLoading, setIsLoading] = useState(false); // track whether city suggestions are loading
  const [showSuggestions, setShowSuggestions] = useState(false); // control weather the suggestions drop down is visible
  const [hasSearched, setHasSearched] = useState(false); // track whether a city search has finished
  const searchRef = useRef<HTMLDivElement>(null); // keep a reference to the container to detect clicks outside it
   // get weather functions and state from your custom hook
  const { fetchWeather, searchCities, loading, clearError, error } = useWeather();
  
  useEffect(() => {
    // close the dropdown when someone clicks outside the container
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
     // Remove the listener when this component leaves the page
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  useEffect(() => {
    if (error) {
      // shows an error notification when the hook provides an error
      toast.error(error, {
        duration: 4000,
        position: 'bottom-right',
      });
    }
  }, [error]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // update the input and remove the previous weather error
    setQuery(value);
    clearError();
    
    // Only search when there are at least three characters
    if (value.length > 2) {
      setShowSuggestions(true);
      setIsLoading(true);

      try {
        // Ask for matching cities and store the results
      const results = await searchCities(value);
      setSuggestions(results);
      setHasSearched(true);
      } catch (error) {
        // clear the results if the city search fails
        console.error('Search error: ', error);
        setSuggestions([]);
        setHasSearched(true);
       } finally {
        // stop showing the suggestions spinner
        setIsLoading(false);
      }
    } else {
      // Hide suggestions when the input is too short
      setSuggestions([]);
      setShowSuggestions(false);
      setHasSearched(false);
      setIsLoading(false)
    }
  };

   const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the form from refreshing the page.
    e.preventDefault();
    
    if (query.trim()) {
      clearError();
      
    try {
    const promise = fetchWeather(query);
    {/*Promise toast*/}
      await toast.promise (
        promise, 
        { 
          loading: `showing weather for ${query}....`,
          success: `Weather data loaded for ${query}...`,
          error: `Could not find ${query}. Please try again.`,
        },
        {
          duration: 4000,
          position: 'bottom-right'
        },  
       );  

       // Clear the search after the promise resolves successfully
       setQuery('');
       setSuggestions([]);
       setShowSuggestions(false);
       setHasSearched(false);

       } catch (error) {
        // keep the input so the user can try again
       console.error('Submit error:', error);
       }
     }
    };

   const handleSuggestionClick = async (city: GeoCity) => {
    // ignore another selection while weather is loading
    if (loading) return

    clearError();

    try {
    const promise = fetchWeather(city.name);
    // shows progress and wait for the weather request to finish
    await toast.promise(
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
    
    // clear the search after the promise resolves successfully
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setHasSearched(false);

    } catch (error) {
      console.error('Suggestion error:', error);
    }
  };
 
  return (
      <> 
        {/*search container*/}
        <div className={'searchContainer'} ref={searchRef}>
          {/* The form handles both the submit and enter key. */}
          <form className={'formContainer'} onSubmit={handleSubmit}>
            <div className={'formGroup'}>
              <input className={'searchInput'}
                          type={'text'} 
                   placeholder={'Search'} 
                         value={query} 
                      onChange={handleInputChange}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={(e) => {
                        // only reopen suggestions for a long enough search
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmit(e);}}}/>
              {/* Disable submission while loading or when input is empty */}
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
           
      {/* Dropdown suggestions: shows loading, no results or matching cities */}
       {showSuggestions &&  (
        <div className={'searchDropDown'}>
          {isLoading ? (
            <div className={'searchLoading'}>
              <div className={'loading-spinner'}></div>
              <p>Search city....</p>
            </div>
          ) : hasSearched && suggestions.length === 0 ? (
              <div className={'noResults'}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ marginBottom: '8px' }}
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.3-4.3"/>
                  <path d="M8 11h6" />
                </svg>
                <p>No cities found for "{query}"</p>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>
                  Try checking the spelling or search for a different city
                </span>
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((city, index) => (
                // create a selectable button for each matching city
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
            ) : null}
          </div>
        )}
      </div>

      </>
  );
}

export default Search
