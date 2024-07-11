import React, { useState } from 'react';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/')
    }
    catch(error){
      dispatch(signInFailure(error.message));
    }

  }


  return (
    <div className="sign-in-box">
      <form onSubmit={(e) => handleSubmit(e)} className='sign-in-form'>
        <div className="fields">
          <label htmlFor="username">Username</label>
          <input onChange={(e) => handleChange(e)} type="text" id="username" placeholder='enter your username' />
        </div>
        <div className="fields">
          <label htmlFor="password">Password</label>
          <input onChange={(e) => handleChange(e)} type="password" id="password" placeholder='enter your password'/>
        </div>
        <button className='submit-btn'>Sign in</button>
      </form>
    </div>
  )
}

export default SignIn
