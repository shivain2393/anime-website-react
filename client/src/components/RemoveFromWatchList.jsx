import React from 'react'
import { useDispatch } from 'react-redux';
import { updateWatchListStart, updateWatchListSuccess, updateWatchListFailure } from '../redux/user/userSlice';


const RemoveFromWatchList = ({ animeId }) => {

    const dispatch = useDispatch();

    const removeFromWatchList = async (event) => {
        event.preventDefault();

        try{

            dispatch(updateWatchListStart());

            const res = await fetch('/api/watchlist/removefromwatchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({animeId : animeId})
            })

            const data  = await res.json();

            if(data.success === false){
                dispatch(updateWatchListFailure(data.message));
                return;
            }

            dispatch(updateWatchListSuccess(data));
            console.log(data);
        }            
        catch (error) {
            dispatch(updateWatchListFailure(error.message));
        }
    }

    return (
        <div onClick={removeFromWatchList} className='add-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={30}>
            <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>   
        </div>
    )
}

export default RemoveFromWatchList
