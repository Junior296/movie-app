import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams } from "react-router-dom";
import SerieCard from "./serieCard";
import MovieCard from "./MovieCard";

export default function SeachPage() {
    const { query } = useParams();
    const [results, setResults] = useState(null)

    useEffect(() => {
        if (query) {
            document.title = `Results for ${query} | CW Movie`;
        }
    }, [query]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/movies/search/?q=${query}`)
            .then((res) => setResults(res.data))
            .catch((err) => console.error("Error fetching movies", err));
    }, [query]);

    if (!results) {
        return (
            <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center fs-1">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="container-fluid text-center">
            <div className="my-5">
                <h1 className="text-primary">Results for '{query}'</h1>
            </div>

            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                {results.map((movie, index) => (
                    <div className="col d-flex justify-content-center" key={index}>
                        <div style={{ width: '100%', maxWidth: '220px' }}>
                            {movie.other_parts.length > 0 ? (
                                <SerieCard key={movie.id} movie={movie} />
                            ) : (
                                <MovieCard key={movie.id} movie={movie} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}
