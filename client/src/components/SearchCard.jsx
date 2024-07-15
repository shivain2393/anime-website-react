import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard = ({ anime }) => {
  return (
    <Link to={`/animes/${anime._id}`} state={{ anime }} className='search-card'>
      <img src={anime.coverImage} alt="cover-image" className="search-card-cover" />
      <h3>{anime.title}</h3>
    </Link>
  )
}

export default SearchCard
