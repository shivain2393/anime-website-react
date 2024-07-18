import React, { useState, useEffect, useRef } from 'react'
import AnimeCard from '../components/AnimeCard'
import { app } from '../firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateAnimesStart, updateAnimesSuccess, updateAnimesFailure } from '../redux/animes/animeSlice.js'
import { useDispatch } from 'react-redux'


const AddAnime = () => {

    const [formData, setFormData] = useState({
        title: '',
        rating: '',
        genres: [],
    })
    console.log(formData)

    const [coverImageFile, setCoverImageFile] = useState(undefined);
    const [backgroundImageFile, setBackgroundImageFile] = useState(undefined);
    const [coverImageProgress, setCoverImageProgress] = useState(0);
    const [backgroundImageProgress, setBackgroundImageProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);

    const uploadFileRefCoverImage = useRef(null);
    const uploadFileRefBackgroudImg  = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `ZoroWatch - Add Anime `;
      }, []);


    useEffect(() => {
        if(coverImageFile){
            handleFileUpload(coverImageFile, 'coverImage');
        }

        if(backgroundImageFile){
            handleFileUpload(backgroundImageFile, 'backgroundImage');
        }

    }, [coverImageFile, backgroundImageFile])


    const handleFileUpload = (file, key) => {
        setUploadingFile(true);
        const storage = getStorage(app);
        const fileName = formData.title + '-' + key + '-' + new Date().getTime();
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const completed = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(key === 'coverImage'){
                    setCoverImageProgress(Math.round(completed));
                }
                else{
                    setBackgroundImageProgress(Math.round(completed));
                } 
            },
            (error) => {
                setError(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then
                ((downloadURL) => {
                    setFormData({ ...formData, [key]: downloadURL})
                }) 
            }
        )
        if(key === 'coverImage'){
            setCoverImageFile(undefined);
        }
        else{
            setBackgroundImageFile(undefined);
        } 
        setUploadingFile(false);
        setError(false);
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
                    <textarea rows={4}  onChange={handleChange} id="description"></textarea>
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
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Romance" onChange={handleCheckboxChange} checked={formData.genres.includes('Romance')} />
                            <label htmlFor="Romance">Romance</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Sports" onChange={handleCheckboxChange} checked={formData.genres.includes('Sports')} />
                            <label htmlFor="Sports">Sports</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Mystery" onChange={handleCheckboxChange} checked={formData.genres.includes('Mystery')} />
                            <label htmlFor="Mystery">Mystery</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Thriller" onChange={handleCheckboxChange} checked={formData.genres.includes('Thriller')} />
                            <label htmlFor="Thriller">Thriller</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Horror" onChange={handleCheckboxChange} checked={formData.genres.includes('Horror')} />
                            <label htmlFor="Horror">Horror</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Isekai" onChange={handleCheckboxChange} checked={formData.genres.includes('Isekai')} />
                            <label htmlFor="Isekai">Isekai</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="School" onChange={handleCheckboxChange} checked={formData.genres.includes('School')} />
                            <label htmlFor="School">School</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Sci-fi" onChange={handleCheckboxChange} checked={formData.genres.includes('Sci-fi')} />
                            <label htmlFor="Sci-fi">Sci-fi</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Psychological" onChange={handleCheckboxChange} checked={formData.genres.includes('Psychological')} />
                            <label htmlFor="Psychological">Psychological</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Mecha" onChange={handleCheckboxChange} checked={formData.genres.includes('Mecha')} />
                            <label htmlFor="Mecha">Mecha</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Magic" onChange={handleCheckboxChange} checked={formData.genres.includes('Magic')} />
                            <label htmlFor="Magic">Magic</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Music" onChange={handleCheckboxChange} checked={formData.genres.includes('Music')} />
                            <label htmlFor="Music">Music</label>
                        </div>
                        <div className='genre-checkboxes'>
                            <input type="checkbox" id="Shounen" onChange={handleCheckboxChange} checked={formData.genres.includes('Shounen')} />
                            <label htmlFor="Shounen">Shounen</label>
                        </div>
                    </div>
                </div>
                <div className="fields">
                    <label htmlFor="releaseDate">Release Date of the Anime</label>
                    <input onChange={handleChange} type="date" id="releaseDate" />
                </div>
                <div className="fields">
                    <label htmlFor="coverImage">Cover Image of the Anime</label>
                    <input ref={uploadFileRefCoverImage} onChange={(e) => setCoverImageFile(e.target.files[0])} accept='image/*' type="file" id='coverImage' />
                    <button disabled={uploadingFile} onClick={() => uploadFileRefCoverImage.current.click()} type='button' className="add-file-btn">Choose file</button>
                    {(coverImageProgress > 0) && <p className='msg'>{coverImageProgress === 100 ? 'File Uploaded Sucessfully' : `File is ${coverImageProgress}% uploaded`}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="backgroundImage">Background Image of the Anime</label>
                    <input ref={uploadFileRefBackgroudImg} onChange={(e) => setBackgroundImageFile(e.target.files[0])} accept='image/*' type="file" id='backgroundImage' />
                    <button disabled={uploadingFile} onClick={() => uploadFileRefBackgroudImg.current.click()} type='button' className="add-file-btn">Choose file</button>
                    {(backgroundImageProgress > 0) && <p className='msg'>{backgroundImageProgress === 100 ? 'File Uploaded Sucessfully' : `File is ${backgroundImageProgress}% uploaded`}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="rating">Rating of the Anime</label>
                    <input value={formData.rating} onChange={handleChange} step={0.1} min='0' max='10' type="number" id='rating' />
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
