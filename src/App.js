import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NewReleases from './Pages/NewReleases';
import LandingPage from './Pages/LandingPage';
import { ToastContainer } from 'react-toastify';
import SongsPage from './Pages/AllSongs';
import ArtistsPage from './Pages/Artists';
import PlaylistsPage from './Pages/Playlists';
import SavedPage from './Pages/Saved';




function App() {
  return (
    <>
     
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/HomePage" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/NewReleases" element={<NewReleases />} />
          <Route path="/AllSongs" element={<SongsPage />} />
          <Route path="/Artists" element={<ArtistsPage />} />
          <Route path="/Playlists" element={<PlaylistsPage />} />
          <Route path="/Saved" element={<SavedPage />} />

        </Routes>
        <ToastContainer />

    </>
  );
}

export default App;
