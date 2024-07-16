import React from 'react'
import AnimeCard from '../components/AnimeCard';
import { useSelector } from 'react-redux';

const AllAnimes = ({ isDeleteAnimePage = false}) => {
  
    const { animes, error } = useSelector(state => state.anime)

    return (
        <>  <h1 className='animes-page-h1'>{isDeleteAnimePage ? "Delete Animes" : "Animes"}</h1>
            {error && <p className='error'>{error}</p>}
            <div className='animes-container'>
                {animes.map((anime) => (
                    <AnimeCard key={anime._id} anime={anime} disableLink={false} isDeleteAnimePage={isDeleteAnimePage}/>
                ))}
            </div>
        </>
    )
}

export default AllAnimes
