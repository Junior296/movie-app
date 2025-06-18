import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import { useParams } from "react-router-dom";
import SerieCard from "./serieCard";
import { Link } from "react-router-dom";

export default function AllSerieParts() {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [series, setSeries] = useState(null)

    useEffect(() => {
        if (serie) {
            document.title = `${serie.title} | CW Movie`;
        }
    }, [serie]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/serie/view/${id}`)
            .then((res) => {
                setSerie(res.data)
            })
            .catch((err) => console.error("Error fetching movie", err));
    }, [id]);

    useEffect(() => {
        axios.get(`${apiUrl}/series`)
            .then(response => {
                setSeries(response.data)
            })
            .catch(error => console.error("error fetching series")
            )
    }, [])

    if (!serie) {
        return (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 m-2">
                {[...Array(24)].map((_, index) => (
                    <div key={index} className="col">
                        <div className="shimmer-card" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-black p-2">
            <div className="mb-5">
                <h3 className="text-primary text-center mb-4">{serie.title} <span className="fs-5 text-danger"> - By VJ {serie.vj_name}</span></h3>
                <p className="fs-5 border text-light rounded-3 p-3">{serie.description}</p>
            </div>

            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 m-2">
                {serie.movies.map((movie, index) => (
                    <div className="col" key={index}>
                        <div style={{ width: '100%', maxWidth: '220px' }}>
                            <SerieCard movie={movie} />
                        </div>
                    </div>
                ))}
            </div>


            <hr className="text-white" />
            <div className="mb-5">
                <h3 className="mb-3 fs-1 text-danger">Other Series</h3>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 m-2">
                    {series && series.filter((s) => s.id !== serie.id).sort((a, b) => b.id - a.id).slice(0, 6).map((serie) => (
                        <div className="col" key={serie.id}>
                            <Link to={`/serie/${serie.id}`} className="text-decoration-none">
                                <div className="card bg-dark text-white border-0 rounded shadow-sm" style={{ overflow: "hidden", width: "250px" }}>
                                    <div className="overlay-play position-absolute">
                                        <img
                                            width="50"
                                            height="50"
                                            src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-play.png"
                                            alt="Play"
                                        />
                                    </div>
                                    <img
                                        src={serie.thumb}
                                        className="thumb"
                                        alt={serie.title}
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                    <div className="card-body p-2">
                                        <h6 className="card-title text-truncate mb-0" style={{ fontSize: "0.9rem" }}>{serie.title}</h6>
                                        <p className="card-text text-end text-primary mb-0" style={{ fontSize: "0.75rem" }}>VJ {serie.vj_name}</p>
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
