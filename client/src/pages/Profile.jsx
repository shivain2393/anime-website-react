import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WatchList from '../components/WatchList';
import { updateUserDetailsStart, updateUserDetailsSuccess, updateUserDetailsFailure } from '../redux/user/userSlice.js'
import { app } from '../firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const Profile = () => {

  const { currentUser, loading } = useSelector(state => state.user);
  const [avatarImage, setAvatarImage] = useState(undefined);
  const [backgroundImage, setBackgroundImage] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    if(avatarImage || backgroundImage){
      setDisableSave(false);
    }else{
      setDisableSave(true);
    }
  }, [avatarImage, backgroundImage])

  const backgroundImageStyle = {
    backgroundImage: `url(${currentUser.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const completed = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(completed);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async () => {
    try {
      dispatch(updateUserDetailsStart());
      setDisableSave(true);

      let formData = {}

      if(avatarImage){
        const avatarUrl = await handleFileUpload(avatarImage, 'avatar')
        formData = {
          ...formData,
          avatar: avatarUrl
        }
      }

      if(backgroundImage){
        const backgroundImgUrl = await handleFileUpload(backgroundImage, 'backgroundImage');
        formData = {
          ...formData,
          backgroundImage: backgroundImgUrl
        }
      }


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
          <img src={currentUser.avatar} width={200} alt="profile-icon" className="profile-icon" />
          <span>{currentUser.username}</span>
          <span>{currentUser.role}</span>
        </div>
        <div className="edit-profile">
          {!editMode && 
          <button onClick={handleEditMode} type='button' className='animated-btn'>Edit</button>}
          {editMode && 
          <>
            <input onChange={(e) => setAvatarImage(e.target.files[0])} accept='image/*' type="file" name="" id="avatar" />
            <input onChange={(e) => setBackgroundImage(e.target.files[0])} accept='image/*' type="file" name="" id="backgroundImage" />
            <button disabled={disableSave} onClick={handleSubmit} className='animated-btn' >{loading ? 'Loading...' : 'Save'}</button>
            <button disabled={loading} onClick={handleEditMode} type='button' className='animated-btn' >Cancel</button> 
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
