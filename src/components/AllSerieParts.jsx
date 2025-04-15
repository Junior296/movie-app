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
            .then((res) => setSerie(res.data))
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

    if (!serie) {
        return (
            <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center fs-1">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="container-fluid text-center">
            <div className="m-5">
                <h1 className="text-primary">{serie.title}</h1>
                {/* <p className="text-muted fs-5 border rounded-3 p-3">{serie.description}</p> */}
                {/* <p>Categories: {serie.categories.map(cat => <span>{cat.name} </span>)}</p> */}
                {/* <p>Tags: {serie.get_taglist.map(tag => <span>{tag} </span>)}</p> */}
            </div>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {serie.movies.map((movie, index) => (
                    <div className="col" key={index}>
                        <SerieCard movie={movie} />
                    </div>
                ))}
            </div>

            <hr />
            <div className="mb-5">
                <h3 className="mb-3 fs-1">Other Series</h3>
                <div className="d-flex overflow-auto gap-3">
                    {series ? series.sort((a, b) => b.id - a.id).map((serie) => (
                        <div className="card shadow-sm border mb-2" style={{ minWidth: "200px", minHeight: "300px", border: 'none' }}>
                            <Link to={`/serie/${serie.id}`} className="position-relative">
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
                                style={{ height: "250px", width: '100%', objectFit: "cover" }}
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
