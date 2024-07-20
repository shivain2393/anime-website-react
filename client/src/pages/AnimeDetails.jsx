import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddToWatchList from '../components/AddToWatchList'
import RemoveFromWatchList from '../components/RemoveFromWatchList'

const AnimeDetails = () => {

    const location = useLocation();
    const { currentUser } = useSelector(state => state.user)
    const { anime } = location.state;
    console.log(anime)

    useEffect(() => {
        document.title = `ZoroWatch - ${anime.title} `;
      }, []);

    const formattedDate = new Date(anime.releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='anime-details-container'>
            <div className="bg-img">
                <img src={anime.backgroundImage} alt="" />
                <div className="anime-bg-overlay"></div>
            </div>
            <div className="anime-details">
                <div className='details'>
                    <div className="details-left">
                        <img src={anime.coverImage} alt="" />
                        <div className='details-left-info'>
                            <div className='anime-details-left'><span className='headings'>ReleaseDate: </span><span className='info'>{formattedDate}</span></div>
                            <div className='anime-details-left'><span className='headings'>Genres: </span> 
                                <span className='info'>{anime.genres.map((genre, index) => (
                                    <span key={index}>{genre}, </span>
                                ))}</span>
                            </div>
                            <div className='anime-details-left'><span className='headings'>Rating:</span><span className="info">{anime.rating}</span> </div>
                            <div className='anime-details-left'><span className='headings'>Status:</span><span className="info">{anime.status}</span> </div>
                        </div>
                    </div>
                    <div className="details-right">
                        <h1>{anime.title}</h1>
                        <div className="desc">
                            <h2>Description</h2>
                            <p>{anime.description}</p>
                        </div>
                    </div>
                </div>
                {currentUser && (currentUser.watchList.includes(anime._id) ?

                <RemoveFromWatchList animeId={anime._id} isAnimeDetailsPage={true} /> :
                    
                <AddToWatchList animeId={anime._id} isAnimeDetailsPage={true} />
                )
                }
            </div>
        </div>
    )
}

export default AnimeDetails
