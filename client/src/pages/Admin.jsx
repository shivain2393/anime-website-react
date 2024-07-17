import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Admin = () => {

    const { currentUser } = useSelector(state => state.user);
    const [username, setUsername] = useState('');
    const [userDetails, setUserDetails] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(''); 

    const handleChange = (event) => {;
        setUsername(event.target.value);
    
    }

    const submitUserDetailsChange = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const res = await fetch('/api/admin/changeuserdetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })

            const data = await res.json();

            if(data.success === false){
                setLoading(false);
                setError(data.message);
                return;
            }
            
            setMessage("Successfully Updated");
            setUserDetails(data);
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);

        }
    }

    const handleCheckboxChange = (event) => {
        setUserDetails({
            ...userDetails,
            role: event.target.id
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const res = await fetch('/api/admin/getuserdetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })

            const data = await res.json();

            if(data.success === false){
                setError(data.message);
                setLoading(false);
                return;
            }

            setError('')
            setUserDetails(data);
            setLoading(false);

        } catch (error) {
            setError(data.message);
            setLoading(false);
        }

    }

    return (
        <div className='admin-page'>
            <h1>Admin Page</h1>
            <div className="admin-controls-container">
                <h2>Welcome <span>{currentUser.username}</span></h2>
                <div className="admin-control-buttons">
                    <button type='button' className='animated-btn admin-btn'>
                        <Link to={'/admin/add-anime'}>Add Anime</Link>
                    </button>
                    <button type='button' className="animated-btn cancel-btn admin-btn">
                        <Link to={'/admin/delete-anime'}>Delete Anime</Link>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='get-user-details-form'>
                    <div className="fields">
                        <label htmlFor="search-username">Enter Username</label>
                        <div className="search-username-container">
                            <input onChange={handleChange} type="text" placeholder="Search User"  id='search-username'/>
                            <button disabled={loading} className='admin-search-btn'>Search</button>
                        </div>
                    </div>
                </form>
                {userDetails && <form onSubmit={submitUserDetailsChange} className="show-user-details-form">
                    <h2>User Details</h2>
                    <div className="fields">
                        <label htmlFor="username">Username</label>
                        <input type='text' value={userDetails.username} id="username"  readOnly/>
                    </div>
                    <div className="fields">
                        <label htmlFor="email">E-mail</label>
                        <input type='text' value={userDetails.email} id="email"  readOnlyy/>
                    </div>
                    <div className="fields role">
                        <div className="user-roles">
                            <div className="role-checkboxes">
                                <input type="checkbox" id="user"  onChange={handleCheckboxChange}  checked={userDetails.role === 'user'}/>
                                <label htmlFor="Action">User</label>
                            </div>
                            <div className="role-checkboxes">
                                <input type="checkbox" id="admin"  onChange={handleCheckboxChange}  checked={userDetails.role === 'admin'}/>
                                <label htmlFor="Action">Admin</label>
                            </div>
                        </div>
                    </div>
                    <button disabled={loading} type="submit" className='admin-search-btn'>Submit</button>
                </form>}
                {error && <p className='error'>{error}</p>}
                {message && <p className='msg'>{message}</p>}   
            </div>
        </div>
    )
}

export default Admin
