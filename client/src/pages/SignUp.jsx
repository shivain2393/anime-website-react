import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate()

  console.log(formData);


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();

    try {
      setLoading(true);
  
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if(!re.test(formData.email.toLowerCase())){
        setError("Enter valid email");
        setLoading(false);
        return;
      }

      if(formData.password !== formData.confirmPassword){
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const { confirmPassword, ...formDataWithoutPassword} = formData;

  
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithoutPassword)
      })

      const data = await res.json();

      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in')

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  }

  return (
    <div className='sign-up-box'>
      <form className='sign-up-form' onSubmit={(e) => handleSubmit(e)}>
        <div className='fields'>
          <label htmlFor="username">Username</label>
          <input onChange={(e) => handleChange(e)} minLength={4} maxLength={12} placeholder='Enter your username' type="text" id='username' required/>
        </div>
        <div className='fields'>
          <label htmlFor="email">Email</label>
          <input onChange={(e) => handleChange(e)} placeholder='Enter your email' type="text" id='email' required/>
        </div>
        <div className='fields'>
          <label htmlFor="password">Password</label>
          <div className="password">
            <input onChange={(e) => handleChange(e)} minLength={8} maxLength={64} placeholder='Enter your password' type={isPasswordVisible ? "text" : "password"} id='password' required/>
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
        <div className='fields'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password">
            <input onChange={(e) => handleChange(e)} minLength={8} maxLength={64} placeholder='Confirm your password' type={isConfirmPasswordVisible ? "text" : "password"} id="confirmPassword" required/>
            {isConfirmPasswordVisible ?
              <svg onClick={handleConfirmPasswordVisibility} className='eye-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg> :
              <svg onClick={handleConfirmPasswordVisibility} className='eye-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            }
          </div>
        </div>
        {error && <p className='error'>{error}</p>}
        <button disabled={loading} className='submit-btn'>{loading ? 'Loading...' : 'Sign up'}</button>
        <p className='sign-up-para'>Already have an account? 
          <Link to={'/sign-in'}>
            <span className='sign-up-text'>Sign in</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
