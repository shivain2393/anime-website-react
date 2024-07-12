import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Search = () => {

  const { animes } = useSelector(state => state.anime);
  const [filteredAnimes, setFilteredAnimes] = useState([])

  const handleSearch = (event) => {

    const query = event.target.value.toLowerCase();

    if(query.trim() === ''){
      setFilteredAnimes([]);
    }
    else{
      const filtered = animes.filter(anime => anime.title.toLowerCase().includes(query));
      setFilteredAnimes(filtered);
    }
  }


  return (
    <div className='search-container'>
        <input onChange={handleSearch} className="search-box" type="text" placeholder='Search...' />
        <div className='search-results'>
          <ul>
            {filteredAnimes.map((anime, index) => (
              <li key={index}>{anime.title}</li>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default Search
