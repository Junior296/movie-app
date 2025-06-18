import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import MovieCard from "./MovieCard";
import './css/card.css';
import { Link } from "react-router-dom";

export default function Home() {
    const [categoriesWithMovies, setCategoryWithMovies] = useState(null);
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true); // 🔹 Add loading state

    useEffect(() => {
        document.title = "Home | CW Movies";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, seriesRes] = await Promise.all([
                    axios.get(`${apiUrl}/movies/categories`),
                    axios.get(`${apiUrl}/series`)
                ]);

                setCategoryWithMovies(categoriesRes.data);
                setSeries(seriesRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false); // 🔹 Only stop loading after both requests finish
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center bg-dark">
                <div className="spinner-border text-danger fs-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }



    return (
        <div className="container-xl mt-5">
            {categoriesWithMovies.map((category, index) => (
                <div key={index} className="mb-5">
                    <Link className="btn btn-danger mb-3 fs-3" to={`/category/${category.name}`}>
                        {category.name}
                    </Link>
                    <div className="d-flex overflow-auto gap-3">
                        {category.movies.slice(0, 10).map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            ))}

            <div className="mb-5">
                <h3 className="mb-3 text-light">Series</h3>
                <div className="d-flex overflow-auto gap-3">
                    {series.sort((a, b) => b.id - a.id).map((serie) => (
                        <div
                            key={serie.id}
                            className="card shadow-sm mb-2 bg-dark"
                            style={{ minWidth: "250px", minHeight: "300px", border: '2px solid black' }}
                        >
                            <Link to={`/serie/${serie.id}`} className="position-relative">
                                <div className="overlay-play position-absolute" style={{ height: '300px' }}>
                                    <img
                                        width="50"
                                        height="50"
                                        src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-play.png"
                                        alt="Play"
                                    />
                                </div>
                                <img
                                    src={serie.thumb}
                                    className="card-img-top"
                                    alt={serie.title}
                                    style={{ height: "300px", width: '100%', objectFit: "cover" }}
                                />
                            </Link>
                            <div className="card-body px-2 py-2">
                                <h5 className="card-title text-light text-truncate mb-2">{serie.title}</h5>
                                <h6 className="text-primary text-end mb-0">VJ {serie.vj_name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
