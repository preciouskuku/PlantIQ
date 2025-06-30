import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Library from './pages/Library';
import News from './pages/News';
import Company from './pages/Company';
import Solutions from './pages/Solution';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/news" element={<News />} />
        <Route path="/company" element={<Company />} />
        <Route path="/solutions" element={<Solutions />} />
        
      </Routes>
    </Router>
  );
};

export default App;
