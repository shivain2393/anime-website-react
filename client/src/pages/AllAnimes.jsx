import React, { useState, useEffect }from 'react'
import AnimeCard from '../components/AnimeCard';

const AllAnimes = () => {
  
    const [animes, setAnimes] = useState([]);
    const [error, setError] = useState(null)

    const getAllAnimes = async () => {
        try {
            const res = await fetch('/api/anime/showallanimes')
            if(!res){
                setError("Bad Internet Connection");
                return;
            }
            const data = await res.json()
            setAnimes(data);
        } catch (error) {
            setError("Bad Internet Connection")
        }

    }

    useEffect(() => {

        getAllAnimes();

    }, [])

    return (
        <>  <h1 className='animes-page-h1'>Animes</h1>
            {error && <p className='error'>{error}</p>}
            <div className='animes-container'>
                {animes.map((anime) => (
                    <AnimeCard key={anime._id} anime={anime}/>
                ))}
            </div>
        </>
    )
}

export default AllAnimes
