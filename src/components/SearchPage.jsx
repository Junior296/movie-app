import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams } from "react-router-dom";
import SerieCard from "./serieCard";
import MovieCard from "./MovieCard";

export default function SeachPage() {
    const { query } = useParams();
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        if (query) {
            document.title = `Results for ${query} | CW Movie`;
        }
    }, [query]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/movies/search/?q=${query}`)
            .then((res) => setMovies(res.data))
            .catch((err) => console.error("Error fetching movies", err));
    }, [query]);

    if (!movies) {
        return (
            <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center fs-1">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="container-fluid text-center">
            <div className="m-5">
                <h1 className="text-primary">Results for '{query}'</h1>
            </div>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {movies.map((movie, index) => (
                    <div className="col" key={index}>
                        {movie.other_parts.length > 0 ? <SerieCard key={movie.id} movie={movie} /> : <MovieCard key={movie.id} movie={movie} />}
                    </div>
                ))}
            </div>
        </div>

    );
}
