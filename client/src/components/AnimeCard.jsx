import React from 'react'

const AnimeCard = ({ anime }) => {


    return (
        <div className='anime-card'>
            <div className="overlay"></div>
            <img src={anime.coverImage} alt="anime-cover" />
            <div className="anime-card-content">
                <h3>{anime.title}</h3>
            </div>
        </div>
    )
}

export default AnimeCard
