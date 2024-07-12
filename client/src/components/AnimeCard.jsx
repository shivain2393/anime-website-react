import React from 'react'
import { Link } from 'react-router-dom'

const AnimeCard = ({ anime }) => {


    return (
        <Link to={`/anime/${anime._id}`} state={{ anime }} className='anime-card'>
            <div className="overlay"></div>
            <img src={anime.coverImage} alt="anime-cover" />
            <div className="anime-card-content">
                <h3>{anime.title}</h3>
            </div>
        </Link>
    )
}

export default AnimeCard
