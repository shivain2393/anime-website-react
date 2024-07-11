import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className='sign-up-box'>
      <form className='sign-up-form' onSubmit={(e) => handleSubmit(e)}>
        <div className='fields'>
          <label htmlFor="username">Username</label>
          <input onChange={(e) => handleChange(e)} minLength={4} maxLength={12} placeholder='enter your username' type="text" id='username' required/>
        </div>
        <div className='fields'>
          <label htmlFor="email">Email</label>
          <input onChange={(e) => handleChange(e)} placeholder='enter your email' type="text" id='email' required/>
        </div>
        <div className='fields'>
          <label htmlFor="password">Password</label>
          <input onChange={(e) => handleChange(e)} minLength={8} maxLength={64} placeholder='enter your password' type="password" id='password' required/>
        </div>
        <div className='fields'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={(e) => handleChange(e)} minLength={8} maxLength={64} placeholder='confirm your password' type="password" id="confirmPassword" required/>
        </div>
        {error && <p className='error'>{error}</p>}
        <button disabled={loading} className='submit-btn'>{loading ? 'Loading...' : 'Sign up'}</button>
      </form>
    </div>
  )
}

export default SignUp
