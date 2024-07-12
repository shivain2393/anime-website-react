import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import AnimeCard from './AnimeCard';

const WatchList = ({ watchList }) => { 

    const [animeWatchList, setAnimeWatchList] = useState([]);

    const { animes } = useSelector(state => state.anime)

    useEffect(() => {

        if(animes && watchList){
            const list = animes.filter(anime => watchList.includes(anime._id));
            setAnimeWatchList(list);
        }

    }, [animes, watchList])
    
    return (
        <div className='watch-list'>
            <h1>Your Watch-List</h1>
            <div className="watch-list-animes-container">
                {animeWatchList.length > 0 ?
                animeWatchList.map((anime, index) => (
                    <AnimeCard key={anime._id} anime={anime} />
                )) :
                <h2>Your Watchlist is Empty</h2>
                }
            </div>
        </div>
    )
}

export default WatchList
