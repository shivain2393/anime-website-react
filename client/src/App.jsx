import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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


const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='/animes' element={<AllAnimes />} />
          <Route path='/anime/:id' element={<AnimeDetails />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route element={<AdminRoute />}>
              <Route path='/add-anime' element={<AddAnime />} />
            </Route>
          </Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
