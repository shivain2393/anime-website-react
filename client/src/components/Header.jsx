import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='navbar'>
      <h1>ZoroWatch</h1>
      <ul className='nav-links'>
        <li><Link>Home</Link></li>
        <li><Link>Animes</Link></li>
        <li><Link>Mangas</Link></li>
      </ul>

      <div>
        <input className="search-box" type="text" placeholder='Search...' />
      </div>

      <div className='user-controls'>
        <button className='animated-btn'>Login</button>
        <span>Watchlist</span>
        <img src="" alt="user-profile" />
      </div>

    </nav>
  )
}

export default Header
