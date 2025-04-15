import React, { useEffect, useState } from "react";
import apiUrl from "./Api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Nav() {
    const [categories, setCategories] = useState(null)

    const [query, setQuery] = useState("")

    useEffect(() => {
        axios.get(`${apiUrl}/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error fetching categories")
            )
    })



    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={`/`}>CW Movies</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={`/`}>Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                            <ul className="dropdown-menu">
                                {categories ? categories.map((category, index) => (<li><Link className="dropdown-item" to={`/category/${category.name}`} key={index}>{category.name}</Link></li>)) : <p>Loading</p>}
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setQuery(e.target.value)} />
                        <Link to={`/movies/search/${query}`} className="btn btn-outline-success" type="submit"
                        >Search</Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}