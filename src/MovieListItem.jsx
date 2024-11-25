function MovieListItem({ movie, onClick }) {
  return (
    <li onClick={onClick}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/ImageNotFound.png"}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieListItem;