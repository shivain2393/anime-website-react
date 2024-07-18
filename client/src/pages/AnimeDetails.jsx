import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AnimeDetails = () => {

    const location = useLocation();
    const { anime } = location.state;

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
            <div className="bg-img"></div>
            <div className="anime-details">
                <div className='details'>
                    <div className='details-left'>
                    <img src={anime.coverImage} alt="anime-cover" />
                        <h2>Overview</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Genres :
                                        {anime.genres.map((genre, index) =>
                                        <span key={index}>{genre}, </span> )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ReleaseDate: <span>{formattedDate}</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        Rating: <span>{anime.rating}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Status: <span>{anime.status}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="details-right">
                        <h1>{anime.title}</h1>
                        <div className='desc'>
                            <h2>Description</h2>
                            <p>{anime.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeDetails
