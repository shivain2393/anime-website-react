import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel.jsx'
import CardSwiper from '../components/CardSwiper.jsx';
import AnimeCard from '../components/AnimeCard.jsx';

const Home = () => {

  const { animes } = useSelector(state => state.anime);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [recentAnimes, setRecentAnimes] = useState([]);
  const [actionAnimes, setActionAnimes] = useState([]);
  
  useEffect(() => {
    getPopularAnimes();
    getRecentlyAddedAnimes();
    getActionAnimes();
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

  const getActionAnimes = () => {
    const sorted = [...animes].sort((a,b) => b.rating  - a.rating);
    const action = sorted.filter(anime => anime.genres.includes('Action'));
    setActionAnimes(action.slice(0, 10))
  }



  return (
    <div className='homepage-container'>
      <Carousel popularAnimes={popularAnimes}/>
      <h1>Recently Added Animes</h1>
      <div className='recent-animes-container'>
        <CardSwiper className='card-swiper' recentAnimes={recentAnimes} />
      </div>
      <div className="browse-animes-text">
        <h1>Browse Animes</h1>
        <button className='animated-btn' type="button">
          <Link to={'/animes'}>
            See more
          </Link>
        </button>
      </div>
      <div className="browse-animes-container">
        {animes.slice(0, 12).map((anime, index) => (
          <AnimeCard key={index} anime={anime}/>
        ))}
      </div>
      <h1>Featured Action Animes</h1>
      <div className='action-animes-container'>
      <CardSwiper className='card-swiper' recentAnimes={actionAnimes} />
      </div>
    </div>
  )
}

export default Home
