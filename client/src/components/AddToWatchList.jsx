import React from 'react'
import { updateWatchListStart, updateWatchListSucess, updateWatchListFailure } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'

const AddToWatchList = ({ animeId }) => {

    const dispatch = useDispatch();

    const addToWatchList = async () =>{
        try{

            dispatch(updateWatchListStart());

            const res = await fetch('/api/watchlist/addtowatchlist', {
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

            dispatch(updateWatchListSucess(data));
            console.log(data);
        }            
        catch (error) {
            dispatch(updateWatchListFailure(error.message));
        }
    }

    return (
        <div onClick={addToWatchList} className='add-icon'>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={30}>
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
        
        </div>
  )
}

export default AddToWatchList
