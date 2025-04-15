import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams } from "react-router-dom";
import { VideoJS } from "./VideoJS";
import SerieCard from "./serieCard";
import { Link } from "react-router-dom";

export default function SeriePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [series, setSeries] = useState(null)

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

    useEffect(() => {
        axios.get(`${apiUrl}/series`)
            .then(response => {
                setSeries(response.data)
                console.log(`series data: ${response.data}`)
            })
            .catch(error => console.error("error fetching series")
            )
    }, [])

    if (!series) return <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center fs-1"><p>Loading...</p></div>;


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
            <div className="row p-0">
                <div className="col-12">
                    <VideoJS options={videoJsOptions} onReady={(player) => console.log("VideoJS Ready!", player)} />
                </div>
                <div className="m-3">
                    <div className="col-12 mt-3 m-1">
                        <h1 className="text-primary">{movie.name}</h1>
                        <p className="text-muted fs-5 border rounded-3 p-3">{movie.description}</p>
                    </div>
                    <hr />
                    <div className="col-12 mt-3 m-1">
                        <h3 className="text-primary">Other Parts</h3>
                        <div className="d-flex overflow-auto gap-3">
                            {movie.other_parts.map((part) => (
                                <SerieCard key={part.id} movie={part} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="m-3">
                <h3 className="mb-3 fs-1">Other Series</h3>
                <div className="d-flex overflow-auto gap-3">
                    {series ? series.sort((a, b) => b.id - a.id).map((serie) => (
                        <div className="card shadow-sm border mb-2" style={{ minWidth: "200px", minHeight: "300px", border: 'none' }}>
                            <Link to={`/serie/${serie.id}`}>
                                <div className="overlay-play position-absolute">
                                    <img
                                        width="50"
                                        height="50"
                                        src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-play.png"
                                        alt="Play"
                                    />
                                </div>
                            </Link>
                            <img
                                src={serie.thumb}
                                className="card-img-top"
                                alt={serie.title}
                                style={{ height: "300px", width: '100%', objectFit: "cover" }}
                            />
                            <div className="card-body px-2 py-2">
                                <h6 className="card-title text-truncate mb-0">{serie.title}</h6>
                            </div>
                        </div>
                    )) : <p>Loading...</p>}
                </div>
            </div>
        </div>

    );
}
