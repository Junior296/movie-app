import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams, Link } from "react-router-dom";
import { VideoJS } from "./VideoJS";
import SerieCard from "./serieCard";

export default function SeriePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (movie) document.title = `${movie.name} | CW Movie`;
    }, [movie]);

    useEffect(() => {
        axios.get(`${apiUrl}/movies/view/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.error("Error fetching movie", err));
    }, [id]);

    useEffect(() => {
        axios.get(`${apiUrl}/series`)
            .then(res => setSeries(res.data))
            .catch(err => console.error("Error fetching series", err));
    }, []);

    if (!movie) {
        return (
            <div className="container-fluid text-white d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-danger" role="status" />
            </div>
        );
    }

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: movie.video,
            type: "video/mp4"
        }]
    };

    return (
        <div className="bg-black text-white pb-5">
            <div className="container-xl p-4">
                {/* Video Player */}
                <div style={{ position: 'relative', paddingTop: '56.25%' }} className="mb-5">
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} className="border p-2 rounded">
                        <VideoJS options={videoJsOptions} />
                    </div>
                </div>


                {/* Title & Info */}
                <h2 className="text-light mb-3">{movie.name}</h2>
                <p className="text-light bg-dark p-3 rounded">{movie.description}</p>

                {/* Tags */}
                {movie.get_taglist.length > 0 && (
                    <div className="mb-4">
                        <h5 className="text-danger">Tags:</h5>
                        {movie.get_taglist.map((tag, i) => (
                            <Link key={i} to={`/movies/search/${tag.slice(1)}`} className="btn btn-outline-success btn-sm me-2 mb-2">{tag}</Link>
                        ))}
                    </div>
                )}

                {/* Other Parts */}
                {movie.other_parts.length > 0 && (
                    <>
                        <h4 className="text-warning mb-3">Other Parts</h4>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 mb-5">
                            {movie.other_parts.map((part) => (
                                <div key={part.id} className="col">
                                    <SerieCard movie={part} />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Other Series */}
                <h4 className="text-danger mb-3">Other Series</h4>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
                    {series.slice(0, 10).map((serie) => (
                        <div className="col" key={serie.id}>
                            <Link to={`/serie/${serie.id}`} className="text-decoration-none">
                                <div className="card bg-dark text-white h-100 border-0">
                                    <div className="position-relative">
                                        <img
                                            src={serie.thumb}
                                            className="card-img-top"
                                            alt={serie.title}
                                            style={{ height: "300px", objectFit: "cover" }}
                                        />
                                        <div className="position-absolute top-50 start-50 translate-middle">
                                            <img
                                                src="https://img.icons8.com/ios-filled/50/ffffff/play-button-circled.png"
                                                width="48"
                                                alt="Play"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body px-2 py-1">
                                        <h6 className="card-title text-truncate mb-1">{serie.title}</h6>
                                        <p className="card-text text-end text-info mb-0" style={{ fontSize: "0.75rem" }}>
                                            VJ {serie.vj_name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
