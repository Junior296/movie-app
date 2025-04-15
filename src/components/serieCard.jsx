import React from 'react';
import { Link } from 'react-router-dom';

export default function SerieCard({ movie }) {
  return (
    <div className="card shadow-sm bg-dark mb-2" style={{ minWidth: "250px", minHeight: "300px", border: '1px solid black' }}>
      <Link to={`/serie_part/${movie.id}`} className="position-relative d-block">
        <div style={{ height: "300px"}}  className="overlay-play position-absolute">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-play.png"
            alt="Play"
          />
        </div>
        <img
          src={movie.thumb}
          className="card-img-top"
          alt={movie.name}
          style={{ height: "300px", width: '100%', objectFit: "cover" }}
        />
      </Link>
      <div className="card-body px-2 py-2">
        <h5 className="card-title text-light text-truncate mb-2">{movie.name}</h5>
        <Link className="text-decoration-none text-primary text-end" to={`/movies/search/${movie.vj_name}`}>VJ {movie.vj_name}</Link>
      </div>
    </div>
  );
}
