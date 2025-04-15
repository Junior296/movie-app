import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams } from "react-router-dom";
import SerieCard from "./serieCard";
import MovieCard from "./MovieCard";

export default function AllCategoryMovies() {
    const { name } = useParams();
    const [movies, setMovies] = useState(null)


    useEffect(() => {
        axios
            .get(`${apiUrl}/movies/category/${name}`)
            .then((res) => setMovies(res.data))
            .catch((err) => console.error("Error fetching movies", err));
    }, [name]);

    if (!movies) {
        return (
            <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center fs-1">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="m-5">
                <h1 className="text-primary">{name} Movies</h1>
            </div>
            <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                {movies.map((movie, index) => (
                    <div className="col  d-flex justify-content-center" key={index}>
                        <div style={{ width: '100%', maxWidth: '220px' }}>
                            <MovieCard key={movie.id} movie={movie} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
