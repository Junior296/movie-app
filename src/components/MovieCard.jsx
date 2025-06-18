import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="card bg-dark text-white h-100 border-0 shadow-sm" style={{width: "220px"}}>
      <Link to={`/movie/${movie.id}`}>
        <div className="overlay-play position-absolute">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-play.png"
            alt="Play"
          />
        </div>
        <img
          src={movie.thumb}
          alt={movie.name}
          className="thumb"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body px-3 py-2">
        <h6 className="card-title text-truncate mb-1">{movie.name}</h6>
        <Link
          className="text-decoration-none text-primary small d-block text-end"
          to={`/movies/search/${movie.vj_name}`}
        >
          VJ {movie.vj_name}
        </Link>
      </div>
    </div>
  );
}
