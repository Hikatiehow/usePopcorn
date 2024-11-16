import MovieListItem from "./MovieListItem";

function MovieList({ movies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MovieList;
