import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./Api";
import MovieCard from "./MovieCard";
import './css/card.css';
import { Link } from "react-router-dom";

export default function Home() {
    const [categoriesWithMovies, setCategoryWithMovies] = useState(null)
    const [series, setSeries] = useState(null)

    useEffect(() => {
        document.title = "Home | MovieStream"; // or whatever your title is
      }, []);
      
    useEffect(() => {
        axios.get(`${apiUrl}/movies/categories`)
            .then(response => {
                setCategoryWithMovies(response.data)
                // console.log(`movies data: ${response.data}`)
            })
            .catch(error => console.error("error fetching movies")
            )
    }, [])

    useEffect(() => {
        axios.get(`${apiUrl}/series`)
            .then(response => {
                setSeries(response.data)
                console.log(`series data: ${response.data}`)
            })
            .catch(error => console.error("error fetching series")
            )
    }, [])


    if (!categoriesWithMovies) return <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center fs-1"><p>Loading...</p></div>;
    if (!series) return <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center fs-1"><p>Loading...</p></div>;

    return (

        <div className="container-fluid">
            {categoriesWithMovies.map((category, index) => (
                <div key={index} className="mb-5">
                    <h3 className="mb-3">{category.name}</h3>
                    <div className="d-flex overflow-auto gap-3">
                        {category.movies.slice(0, 10).map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            ))}

            <div className="mb-5">
                <h3 className="mb-3">Series</h3>
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
