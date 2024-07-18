import React, { useState, useEffect } from 'react';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    document.title = `ZoroWatch - Sign In`;
  }, []);

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

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
          <div className="password">
            <input onChange={(e) => handleChange(e)} type={isPasswordVisible ? "text" : "password"} id="password" placeholder='Enter your password' required/>
            {isPasswordVisible ?
              <svg onClick={handlePasswordVisibility} className='eye-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg> :
              <svg onClick={handlePasswordVisibility} className='eye-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            }
          </div>
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
