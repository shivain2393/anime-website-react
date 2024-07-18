import React, { useEffect } from 'react'
import AllAnimes from './AllAnimes'

const DeleteAnime = () => {

  useEffect(() => {
    document.title = `ZoroWatch - Delete Anime `;
  }, []);


  return (
    <AllAnimes isDeleteAnimePage={true}/>
  )
}

export default DeleteAnime  