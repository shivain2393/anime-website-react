import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Carousel from '../components/Carousel.jsx'
import CardSwiper from '../components/CardSwiper.jsx';

const Home = () => {

  const { animes } = useSelector(state => state.anime);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [recentAnimes, setRecentAnimes] = useState([]);
  
  useEffect(() => {
    getPopularAnimes();
    getRecentlyAddedAnimes();
  }, [animes])

  const getPopularAnimes = () => {

    const sortedAnimes = [...animes].sort((a, b) => b.rating - a.rating);

    const fiveAnimes = sortedAnimes.slice(0, 5);

    setPopularAnimes(fiveAnimes);
  }

  const getRecentlyAddedAnimes = () => {
    const sortedAnimes = [...animes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const tenAnimes = sortedAnimes.slice(0, 10);
    setRecentAnimes(tenAnimes);
  }


  return (
    <div className='homepage-container'>
      <Carousel popularAnimes={popularAnimes}/>
      <h1>Recently Added Animes</h1>
      <div className='recent-animes-container'>
        <CardSwiper className='card-swiper' recentAnimes={recentAnimes} />
      </div>
    </div>
  )
}

export default Home
