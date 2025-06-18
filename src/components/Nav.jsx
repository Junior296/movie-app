import React, { useEffect, useState } from "react";
import apiUrl from "./Api";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import SerieCard from "./serieCard";

export default function Nav() {
    const [query, setQuery] = useState("");
    const [searchedMovies, setSearchedMovies] = useState([]);

    useEffect(() => {
        if (query.trim() === "") return;

        const delayDebounce = setTimeout(() => {
            axios
                .get(`${apiUrl}/movies/search/?q=${query}`)
                .then((response) => {
                    setSearchedMovies(response.data)
                    console.log(response.data);
                })
                .catch((error) => console.log("Error fetching movies"));
        }, 200);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    function clearResults() {
        setQuery("");
        setSearchedMovies([]);
    }

    useEffect(() => {
        if (searchedMovies && searchedMovies.length > 0) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [searchedMovies]);


    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-danger" to={`/`}>
                        CW Movies
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form
                            className="d-flex ms-auto"
                            role="search"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="position-relative">
                                <input
                                    className="form-control pe-5"
                                    type="search"
                                    placeholder="Search for movies..."
                                    aria-label="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <Link
                                to={`/movies/search/${query}`}
                                className="btn btn-outline-danger ms-2"
                                onClick={() => setMovies(null)}
                            >
                                Search
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>

            {searchedMovies && searchedMovies.length > 0 && (
                <>
                    {/* Backdrop layer */}
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        onClick={clearResults}
                        style={{
                            zIndex: 998,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(3px)",
                        }}
                    />

                    {/* Search results modal */}
                    <div
                        className="position-fixed start-50 translate-middle-x w-100 px-3"
                        style={{
                            top: "50px", // below navbar
                            zIndex: 999,
                            maxHeight: "100vh",
                            overflowY: searchedMovies.length > 5 ? "auto" : "visible",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            backdropFilter: "blur(1px)",
                            borderRadius: "8px",
                        }}
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <div className="d-flex justify-content-between align-items-center py-2 mb-4 mt-4">
                            <h5 className="text-light text-center flex-grow-1 mb-0">
                                Results for: <span className="text-danger">"{query}"</span>
                            </h5>
                            <button
                                onClick={clearResults}
                                className="btn-close btn-close-white me-2"
                                aria-label="Close"
                            />
                        </div>

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 pb-3 mb-5">
                            {searchedMovies.map((movie, index) => (
                                <div className="col d-flex justify-content-center" key={index}>
                                    <div
                                        style={{ width: "100%", maxWidth: "220px" }}
                                        onClick={clearResults}
                                    >
                                        {movie.other_parts.length > 0 ? (
                                            <SerieCard movie={movie} />
                                        ) : (
                                            <MovieCard movie={movie} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
