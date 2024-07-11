import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { currentUser } = useSelector(state => state.user);

  const backgroundImageStyle = {
    backgroundImage: `url(${currentUser.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className='profile'>
      <div className="profile-info" style={backgroundImageStyle}>
        <div className="profile-details">
          <img src={currentUser.avatar} width={200} alt="profile-icon" className="profile-icon" />
          <span>{currentUser.username}</span>
          <span>{currentUser.role}</span>
        </div>
      </div>

      <div className="personal-anime-info">

      </div>
    </div>
  )
}

export default Profile
