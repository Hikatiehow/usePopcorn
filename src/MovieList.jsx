import MovieListItem from "./MovieListItem";

function MovieList({ movies, setSelectedID }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem
          movie={movie}
          key={movie.imdbID}
          onClick={() => setSelectedID(movie.imdbID)}
        />
      ))}
    </ul>
  );
}

export default MovieList;
