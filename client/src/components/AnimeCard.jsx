import React from 'react'
import { Link } from 'react-router-dom'
import AddToWatchList from '../components/AddToWatchList';

const AnimeCard = ({ anime }) => {


    return (
        <Link to={`/anime/${anime._id}`} state={{ anime }} className='anime-card'>
            <div className="overlay"></div>
            <img src={anime.coverImage} alt="anime-cover" />
            <div className="anime-card-content">
                <h3>{anime.title}</h3>
                <AddToWatchList animeId={anime._id}/>  
            </div>
        </Link>
    )
}

export default AnimeCard
