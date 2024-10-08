import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import Search from './Search'

const Header = () => {

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignOut = async () => {
    
    try {

      dispatch(signOutStart());

      const res = await fetch('/api/auth/signout');

      const data = await res.json();

      if(data.success === false){
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
      navigate('/sign-in');
      
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }

  return (
    <nav className='navbar'>
      <Link to={'/'}>
        <h1><span>Zoro</span>Watch</h1>
      </Link>
      <ul className='nav-links'>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/animes'}>Animes</Link></li>
        <li><Link to={'/about'}>About</Link></li>
      </ul>

     <Search />

      <div className='user-controls'>
        {currentUser ?
        <>
          {currentUser.role === 'admin' && <div className='admin-link'><Link to={'/admin'}>Admin</Link></div>}
          <Link to={'/profile'}>
            <img className="profile-picture" width={50} height={50} src={currentUser.avatar} alt="profilePic" />
          </Link>
          <button onClick={handleSignOut} className='animated-btn cancel-btn' type='button'>Sign out</button>
        </>
        :
        <Link to={'/sign-in'}>
          <button className='animated-btn'>Sign in</button>
        </Link>
        }
      </div>

    </nav>
  )
}

export default Header
