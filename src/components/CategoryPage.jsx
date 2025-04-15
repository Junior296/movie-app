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
        <div className="container-fluid text-center">
            <div className="m-5">
                <h1 className="text-primary">{name} Movies</h1>
                {/* <p className="text-muted fs-5 border rounded-3 p-3">{serie.description}</p> */}
                {/* <p>Categories: {serie.categories.map(cat => <span>{cat.name} </span>)}</p> */}
                {/* <p>Tags: {serie.get_taglist.map(tag => <span>{tag} </span>)}</p> */}
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
