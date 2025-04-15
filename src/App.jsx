import React from 'react';
import Home from './components/Home';
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './components/MoviePage';
import SeriePage from './components/seriePage';
import AllSerieParts from './components/AllSerieParts';
import AllCategoryMovies from './components/CategoryPage';
import SeachPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/serie_part/:id" element={<SeriePage />} />
        <Route path="/serie/:id" element={<AllSerieParts />} />
        <Route path="/category/:name" element={<AllCategoryMovies />} />
        <Route path="/movies/search/:query" element={<SeachPage />} />
      </Routes>
    </Router>
  );
}

export default App;
