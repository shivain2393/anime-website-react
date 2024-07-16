import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Carousel from '../components/Carousel.jsx'

const Home = () => {

  const { animes } = useSelector(state => state.anime);
  const [popularAnimes, setPopularAnimes] = useState([]);
  
  useEffect(() => {
    getPopularAnimes();
  }, [animes])

  const getPopularAnimes = () => {

    const sortedAnimes = [...animes].sort((a, b) => b.rating - a.rating);

    const fiveAnimes = sortedAnimes.slice(0, 5);

    setPopularAnimes(fiveAnimes);
  }


  return (
    <div className='homepage-container'>
      <Carousel popularAnimes={popularAnimes}/>
    </div>
  )
}

export default Home
