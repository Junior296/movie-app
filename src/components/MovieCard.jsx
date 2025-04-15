import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="card shadow-sm border m-2" style={{ minWidth: "250px", minHeight: "300px", border: 'none' }}>
      <Link to={`/movie/${movie.id}`}>
        <div style={{ height: "300px"}}   className="overlay-play position-absolute">
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
        <h6 className="card-title text-truncate mb-0">{movie.name}</h6>
      </div>
    </div>
  );
}
