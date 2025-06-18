import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import apiUrl from "./Api";
import MovieCard from "./MovieCard";
import './css/netflix.css';
import './css/card.css';
import './css/shimmer.css';
import HeroCarousel from "./Slider";
import { Link } from "react-router-dom";

export default function Home() {
    const [categoriesWithMovies, setCategoryWithMovies] = useState(null);
    const [movies, setMovies] = useState([]);
    const [Scrollmovies, setScrollMovies] = useState([]);
    const [series, setSeries] = useState(null);
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const movieRef = useRef();

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const PAGE_SIZE = 12;


    useEffect(() => {
        document.title = "Home | CW Movies";

        axios.get(`${apiUrl}/movies/categories`)
            .then(res => setCategoryWithMovies(res.data))
            .catch(err => console.error("Error fetching categories with movies"));

        axios.get(`${apiUrl}/series`)
            .then(res => setSeries(res.data))
            .catch(err => console.error("Error fetching series"));

        axios.get(`${apiUrl}/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories"));

        axios.get(`${apiUrl}/movies/scroll`)
            .then(res => setScrollMovies(res.data))
            .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        // Initial load (All movies)
        if (selectedCategory === "All") {
            fetchMovies(page);
        }
    }, [page]);

    const fetchMovies = (pg) => {
        setLoading(true);
        axios.get(`${apiUrl}/movies?page=${pg}`)
            .then(res => {
                setMovies(prev => [...prev, ...res.data.results]);
                setHasMore(res.data.next !== null);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    const fetchCategoryMovies = (category, pg) => {
        setLoading(true);
        const url = `${apiUrl}/movies/category/${category}?page=${pg}`;
        axios.get(url)
            .then(res => {
                setMovies(prev => [...prev, ...res.data.results]);
                setHasMore(res.data.next !== null);
            })
            .catch(error => console.error("Error loading movies", error))
            .finally(() => setLoading(false));
    };

    const onSelected = (category) => {
        setSelectedCategory(category);
        setPage(1);
        setMovies([]);
        setHasMore(true);

        if (category === "All") {
            fetchMovies(1);
        } else {
            fetchCategoryMovies(category, 1);
        }
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);

        if (selectedCategory === "All") {
            fetchMovies(nextPage);
        } else {
            fetchCategoryMovies(selectedCategory, nextPage);
        }
    };

    const scrollToMovies = () => {
        movieRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!series || !categories) {
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
        <div className="text-white bg-black py-4">
            {/* Hero Section */}

            <HeroCarousel movies={Scrollmovies} />


            <div ref={movieRef}>
                {/* Category Filters */}
                <div className="row g-2 justify-content-center mb-5">
                    <div className="col-auto">
                        <button
                            onClick={() => onSelected("All")}
                            className={`btn ${selectedCategory === "All" ? "btn-danger" : "btn-outline-danger"} text-capitalize shadow-sm`}
                        >
                            All
                        </button>
                    </div>
                    {categories.map((cat, index) => (
                        <div className="col-auto" key={index}>
                            <button
                                onClick={() => onSelected(cat.name)}
                                className={`btn ${selectedCategory === cat.name ? "btn-danger" : "btn-outline-danger"} text-capitalize shadow-sm`}
                            >
                                {cat.name}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Movie Grid */}
                {loading && movies.length === 0 ? (
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 m-2">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="col">
                                <div className="shimmer-card" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 m-2 g-3">
                            {movies.map((movie, index) => (
                                <div className="col" key={index}>
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        {hasMore && (
                            <div className="text-center my-4">
                                {loading ?
                                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 m-2">
                                        {[...Array(6)].map((_, index) => (
                                            <div key={index} className="col">
                                                <div className="shimmer-card" />
                                            </div>
                                        ))}
                                    </div>
                                    : <button className="btn btn-outline-danger" onClick={loadMore}>
                                        Load More
                                    </button>
                                }
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Series Section */}
            <h2 className="category-title ms-2 text-danger">TV Series</h2>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 m-2">
                {series.map((serie) => (
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
    );
}
