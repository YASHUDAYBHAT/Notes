import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Createpage from './pages/Createpage.jsx';
import NoteDetailPage from '../src/pages/Notedetailpage.jsx';
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="coffee" className="min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Create" element={<Createpage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
