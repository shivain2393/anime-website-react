import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAnimesStart, getAnimesSucess, getAnimesFailure } from './redux/animes/animeSlice'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import AllAnimes from './pages/AllAnimes'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import AddAnime from './pages/AddAnime'
import AnimeDetails from './pages/AnimeDetails'
import './App.css'
import About from './pages/About'
import DeleteAnime from './pages/DeleteAnime'
import ScrollToTop from './components/ScrollToTop'
import Admin from './pages/Admin'



const App = () => {

  const dispatch = useDispatch();

  const getAllAnimes = async () => {
    try {

        dispatch(getAnimesStart());

        const res = await fetch('/api/anime/showallanimes')
        if(!res){
            dispatch(getAnimesFailure("Bad Internet Connection"))
            return;
        }
        const data = await res.json()
        dispatch(getAnimesSucess(data));

    } catch (error) {
        dispatch(getAnimesFailure("Bad Internet Connection"))
    }

  } 

  useEffect(() => {

    getAllAnimes();

}, [])



  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='/animes' element={<AllAnimes />} />
          <Route path='/animes/:id' element={<AnimeDetails />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route element={<AdminRoute />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/add-anime' element={<AddAnime />} />
              <Route path='/admin/delete-anime' element={<DeleteAnime />} />
            </Route>
          </Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
