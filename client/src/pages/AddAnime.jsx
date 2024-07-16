import React, { useState, useEffect, useRef } from 'react'
import AnimeCard from '../components/AnimeCard'
import { app } from '../firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateAnimesStart, updateAnimesSuccess, updateAnimesFailure } from '../redux/animes/animeSlice.js'
import { useDispatch } from 'react-redux'


const AddAnime = () => {

    const [formData, setFormData] = useState({
        genres: [],
    })

    const [file, setFile] = useState(undefined);
    const [progress, setProgress] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);

    const uploadFileRef = useRef(null);
    const dispatch = useDispatch();


    useEffect(() => {
        if(file){
            handleFileUpload(file);
        }

    }, [file])


    const handleFileUpload = (file) => {
        setUploadingFile(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const completed = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(completed));
            },
            (error) => {
                setFileError(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then
                ((downloadURL) => {
                    setFormData({ ...formData, coverImage: downloadURL})
                }) 
            }
        )
        setFile(undefined)
        setUploadingFile(false);
    }

    const handleChange = (event) => {
        if(event.target.id === 'ongoing' || event.target.id === 'completed'){
            setFormData({
                ...formData,
                status: event.target.id
            })
        }

        if(event.target.type == 'number'){
            const { id, value } = event.target;

            if (id === 'rating') {
                if (value < 0) {
                    setFormData({ ...formData, [id]: 0 });
                } else if (value > 10) {
                    setFormData({ ...formData, [id]: 10 });
                } else {
                    setFormData({ ...formData, [id]: value });
                }
            } else {
                setFormData({ ...formData, [id]: value });
            }
        }

        if (
            event.target.type === 'text' ||
            event.target.type === 'textarea' ||
            event.target.type === 'date'
          ) {
            setFormData({
              ...formData,
              [event.target.id]: event.target.value,
            });
        }
    }

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        
        if(checked){
            setFormData({
                ...formData,
                genres: [...formData.genres, id]
            })
        }
        else{
            setFormData({
                ...formData,
                genres: [...formData.genres.filter(genre => genre !== id)]
            })
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            dispatch(updateAnimesStart());

            setLoading(true);

            const res = await fetch('/api/anime/addanime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();

            if(data.success === false){
                setLoading(false);
                setMessage(data.message);
                dispatch(updateAnimesFailure(data.message));
                return;
            }
            setLoading(false);
            setMessage("Anime added Successfully");
            dispatch(updateAnimesSuccess(data));

        } catch (error) {
            setLoading(false);
            setMessage(error.message);
            dispatch(updateAnimesFailure(error.message))
        }

    }

    return (
        <>
        <h1 className='add-anime-page-h1'>Enter the details of the anime</h1>
        <div className='add-anime-container'>
            <form onSubmit={handleSubmit} className="left-side">
                <div className="fields">
                    <label htmlFor="title">Title of the Anime</label>
                    <input onChange={handleChange} type="text" id="title"/>
                </div>
                <div className="fields">
                    <label htmlFor="description">Description of the Anime</label>
                    <textarea onChange={handleChange} id="description"></textarea>
                </div>
                <div className="fields">
                    <label htmlFor='genre'>Genres of the Anime</label>
                    <div className='anime-genres'>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Action"  onChange={handleCheckboxChange}  checked={formData.genres.includes('Action')}/>
                            <label htmlFor="Action">Action</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Adventure" onChange={handleCheckboxChange} checked={formData.genres.includes('Adventure')}/>
                            <label htmlFor="Adventure">Adventure</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Comedy"  onChange={handleCheckboxChange}  checked={formData.genres.includes('Comedy')}/>
                            <label htmlFor="Comedy">Comedy</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Drama" onChange={handleCheckboxChange}  checked={formData.genres.includes('Drama')}/>
                            <label htmlFor="Drama">Drama</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Fantasy" onChange={handleCheckboxChange} checked={formData.genres.includes('Fantasy')} />
                            <label htmlFor="Fantasy">Fantasy</label>
                        </div>
                    </div>
                </div>
                <div className="fields">
                    <label htmlFor="releaseDate">Release Date of the Anime</label>
                    <input onChange={handleChange} type="date" id="releaseDate" />
                </div>
                <div className="fields">
                    <label htmlFor="coverImage">Cover Image of the Anime</label>
                    <input ref={uploadFileRef} onChange={(e) => setFile(e.target.files[0])} accept='image/*' type="file" id='coverImage' />
                    <button disabled={uploadingFile} onClick={() => uploadFileRef.current.click()} type='button' className="add-file-btn">Choose file</button>
                    {progress && <p className='msg'>{progress === 100 ? 'File Uploaded Sucessfully' : `File is ${progress}% uploaded`}</p>}
                    {fileError && <p className='error'>{fileError}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="rating">Rating of the Anime</label>
                    <input onChange={handleChange} step={0.1} min='0' max='10' type="number" id='rating' />
                </div>
                <div className="fields">
                    <label htmlFor="status">Status of the anime</label>
                    <div className="anime-status">
                        <div className="status-checkboxes">
                            <input onChange={handleChange} type="checkbox" id="ongoing" checked={formData.status === 'ongoing'}/>
                            <label htmlFor="ongoing">Ongoing</label>
                        </div>
                        <div className="status-checkboxes">
                            <input onChange={handleChange} type="checkbox" id="completed" checked={formData.status === 'completed'}/>
                            <label htmlFor="completed">Completed</label>
                        </div>
                    </div>
                </div>
                <button disabled={loading} className='submit-btn'>{loading ? 'Loading...' : 'Add Anime'}</button>   
                {message && <p className='msg'>{message}</p>}
                {error && <p className='error'>{error}</p>}
            </form>
            <div className="right-side">
                <AnimeCard anime={formData} disableLink={true}/>
            </div>
        </div>
        </>
    )
}

export default AddAnime
