import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WatchList from '../components/WatchList';
import { updateUserDetailsStart, updateUserDetailsSuccess, updateUserDetailsFailure } from '../redux/user/userSlice.js'
import { app } from '../firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const Profile = () => {

  const { currentUser, loading } = useSelector(state => state.user);
  const [avatarImage, setAvatarImage] = useState(undefined);
  const [backgroundImage, setBackgroundImage] = useState(undefined);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const avatarImageRef = useRef(null);
  const backgroundImageRef = useRef(null);

  useEffect(() => {
    setFormData(currentUser)
  }, [])

  useEffect(() => {
      if(avatarImage){
        handleFileUpload(avatarImage, 'avatar')
      }

      if(backgroundImage){
        handleFileUpload(backgroundImage, 'backgroundImage')
      }
  }, [avatarImage, backgroundImage])

  const backgroundImageStyle = {
    backgroundImage: `url(${formData.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }


  const handleFileUpload = (file, key) => {
    const storage = getStorage(app);
    const fileName = currentUser.username + '-' + key + '-' + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            const completed = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        },
        (error) => {
            setError(error.message)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then
            ((downloadURL) => {
                setFormData({ ...formData, [key]: downloadURL})
            }) 
        }
    )

    setDisableSave(false);
}

  const handleSubmit = async () => {
    try {
      dispatch(updateUserDetailsStart());
      setDisableSave(true);

      const res = await fetch('/api/user/updatedetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.success === false){
        dispatch(updateUserDetailsFailure(data.message));
        return;
      }
      dispatch(updateUserDetailsSuccess(data));
      setEditMode(false);
      setDisableSave(true);
      
    } catch (error) {
      dispatch(updateUserDetailsFailure(error.message));
    }
  }



  return (
    <div className='profile'>
      <div className="profile-info" style={backgroundImageStyle}>
        <div className="profile-details">
          <div className='profile-icon-container'>
            <img src={formData.avatar} width={200} height={200} alt="profile-icon" className="profile-icon" />
            {editMode && <div onClick={() => avatarImageRef.current.click()} className="profile-pen">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={30}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </div>}
          </div>
          <span>{currentUser.username}</span>
          <span>{currentUser.role}</span>
        </div>
        {editMode && <div onClick={() => backgroundImageRef.current.click()} className='pen-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={60}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </div>}
        <div className="edit-profile">
          {!editMode && 
          <button onClick={handleEditMode} type='button' className='animated-btn'>Edit</button>}
          {editMode && 
          <>
            <input style={{display: 'none'}}  ref={avatarImageRef} onChange={(e) => setAvatarImage(e.target.files[0])} accept='image/*' type="file" name="" id="avatar" />
            <input style={{display: 'none'}} ref={backgroundImageRef} onChange={(e) => setBackgroundImage(e.target.files[0])} accept='image/*' type="file" name="" id="backgroundImage" />
            <button disabled={disableSave} onClick={handleSubmit} className='animated-btn' >{loading ? 'Loading...' : 'Save'}</button>
            <button disabled={loading} onClick={handleEditMode} type='button' className='animated-btn cancel-btn' >Cancel</button> 
          </>
          }
        </div>
      </div>
      <div className="personal-anime-info">
          <WatchList />
      </div>
    </div>
  )
}

export default Profile
