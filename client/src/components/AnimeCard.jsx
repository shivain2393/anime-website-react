import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddToWatchList from '../components/AddToWatchList';
import { useSelector } from 'react-redux';
import RemoveFromWatchList from './RemoveFromWatchList';

const AnimeCard = ({ anime, disableLink }) => {

    
    const { currentUser } = useSelector(state => state.user);

    const watchList = currentUser?.watchList;

    return (
        <>
            {disableLink ? 
                <div className='anime-card'>
                    <div className="overlay"></div>
                    <img src={anime.coverImage} alt="anime-cover" />
                    <div className="anime-card-content">
                        <h3>{anime.title}</h3>
                        {currentUser && (watchList.includes(anime._id) ?
                            <RemoveFromWatchList animeId={anime._id} /> : <AddToWatchList animeId={anime._id}/>)
                        } 
                    </div>
                </div>
                 :
                 <Link to={`/animes/${anime._id}`} state={{ anime }} className='anime-card'>
                    <div className="overlay"></div>
                    <img src={anime.coverImage} alt="anime-cover" />
                    <div className="anime-card-content">
                        <h3>{anime.title}</h3>
                        {currentUser && (watchList.includes(anime._id) ?
                            <RemoveFromWatchList animeId={anime._id} /> : <AddToWatchList animeId={anime._id}/>)
                        } 
                    </div>
                </Link>
            }
        </>
    )
}

export default AnimeCard
