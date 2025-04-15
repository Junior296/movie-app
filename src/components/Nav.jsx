import React, { useEffect, useState } from "react";
import apiUrl from "./Api";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import SerieCard from "./serieCard";

export default function Nav() {
    const [categories, setCategories] = useState(null)

    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        axios.get(`${apiUrl}/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error fetching categories")
            )
    })

    useEffect(() => {
        if (query.trim() === '') return;

        const delayDebounce = setTimeout(() => {
            axios.get(`${apiUrl}/movies/search/?q=${query}`)
                .then(response => setMovies(response.data))
                .catch(error => console.log("Error fetching movies")
                )
        }
            , 500);
        return () => clearTimeout(delayDebounce);
    }, [query]);

    function clearResults() {
        setQuery("");
        setMovies(null);
    }


    return (
        <div className="mb-5">
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>CW Movies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={`/`}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu">
                                    {categories ? categories.map((category, index) => (<li><Link className="dropdown-item" to={`/category/${category.name}`} key={index}>{category.name}</Link></li>)) : <p>Loading</p>}
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setQuery(e.target.value) }} />
                            <Link to={`/movies/search/${query}`} className="btn btn-outline-success" type="submit" onClick={() => setMovies(null)}>
                            Search</Link>
                        </form>
                    </div>
                </div>
            </nav>
            {movies && movies.length > 0 && (
                <div
                    className="container position-absolute"
                    style={{
                        zIndex: 1000,
                        width: '100%',
                        maxWidth: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        height: 'fit-content',
                        left: 0,
                    }}
                >
                    <h2 className="text-primary text-center m-4">Results for '{query}'</h2>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-2">
                        {movies.map((movie, index) => (
                            <div className="col d-flex justify-content-center" key={index}>
                                <div style={{ width: '100%', maxWidth: '220px' }}>
                                    {movie.other_parts.length > 0 ? (
                                        <div onClick={clearResults}>
                                            <SerieCard movie={movie} />
                                        </div>
                                    ) : (
                                        <div onClick={clearResults}>
                                            <MovieCard movie={movie} />
                                        </div>

                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}