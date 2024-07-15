import React, { useState } from 'react';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user)
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
          <input onChange={(e) => handleChange(e)} type="text" id="username" placeholder='Enter your username'  required/>
        </div>
        <div className="fields">
          <label htmlFor="password">Password</label>
          <input onChange={(e) => handleChange(e)} type="password" id="password" placeholder='Enter your password' required/>
        </div>
        {error &&  <span className="error">{error}</span>}
        <button disabled={loading} className='submit-btn'>{loading ? 'Loading...' : 'Sign in'}</button>
        <p className='sign-up-para'>Don't have an account? 
          <Link to={'/sign-up'}>
            <span className='sign-up-text'>Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn
