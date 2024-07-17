import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SearchCard from './SearchCard';

const Search = () => {

  const { animes } = useSelector(state => state.anime);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const searchContainerRef = useRef(null)

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if(query.trim() === ''){
      setFilteredAnimes([]);
      setIsResultsVisible(false);
    }
    else{
      const filtered = animes.filter(anime => anime.title.toLowerCase().includes(query));
      setFilteredAnimes(filtered.slice(0, 5));
      setIsResultsVisible(true);
    }
  }

  const handleCardClick = () => {
    setSearchQuery('');
    setIsResultsVisible(false);
  };

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setIsResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='search-container' ref={searchContainerRef}>
        <div className="search-box">
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input value={searchQuery} onChange={handleSearch} type="text" placeholder='Search...' />
        </div>
        {isResultsVisible && <div className='search-results'>
          <ul>
            {filteredAnimes.map((anime, index) => (
              <li onClick={handleCardClick}>
                <SearchCard key={index} anime={anime}/>
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}

export default Search
