import { IMAGE_NOT_FOUND_URL } from "./config/constants";

function WatchedListItem({ movie, onDeleteItem }) {
  return (
    <li>
      <img
        src={movie.poster !== "N/A" ? movie.poster : IMAGE_NOT_FOUND_URL}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => onDeleteItem(movie.imdbID)}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedListItem;
