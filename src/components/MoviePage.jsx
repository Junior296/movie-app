import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams } from "react-router-dom";
import { VideoJS } from "./VideoJS";
import MovieCard from "./MovieCard";

export default function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    // MoviePage.jsx
    useEffect(() => {
        if (movie) {
            document.title = `${movie.name} | CW Movie`;
        }
    }, [movie]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/movies/view/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.error("Error fetching movie", err));
    }, [id]);

    if (!movie) {
        return (
            <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center fs-1">
                <p>Loading...</p>
            </div>
        );
    }

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: movie.video,
                type: "video/mp4"
            }
        ]
    };


    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-12">
                    <VideoJS options={videoJsOptions} onReady={(player) => console.log("VideoJS Ready!", player)} />
                </div>
                <div className="col-12 mt-3 m-1">
                    <h1 className="text-primary">{movie.name}</h1>
                    <p className="text-muted fs-5 border rounded-3 p-3">{movie.description}</p>
                    <p>Categories: {movie.categories.map(cat => <span>{cat.name} </span>)}</p>
                    <p>Tags: {movie.get_taglist.map(tag => <span>{tag} </span>)}</p>
                </div>
                <div className="col-12 mt-3 m-1">
                    <h3 className="text-primary">Related Movies</h3>
                    <div className="d-flex overflow-auto gap-3">
                        {movie.related_by_name.map((relatedMovie) => (
                            <MovieCard key={relatedMovie.id} movie={relatedMovie} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
