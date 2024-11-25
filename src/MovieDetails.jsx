import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { IMAGE_NOT_FOUND_URL } from "./config/constants";

const APIKEY = import.meta.env.VITE_API_KEY;

function MovieDetails({
  selectedID,
  onCloseMovie,
  handleAddWatchedMovie,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(null);

  const watchedMovie = watchedMovies.find((item) => item.imdbID === selectedID);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function addToWatchedList() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      userRating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    handleAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      //USE EFFECT FOR ESCAPE KEY INSERTED HERE AS WE ONLY WANT IT TO BE ATTACHED
      //WHEN MOVIE DETAILS COMPONENT IS IN THE DOM
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("Closing");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedID}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching Movie Details");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Could not find movie details");
        }
        setMovie(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    if (!title) return; //MUST DO THIS AS TITLE IS UNDEFINED BEFORE THE MOVIE COMES BACK FROM API CALL
    document.title = `Movie | ${title}`;
    return function () {
      //CLEAN UP FUNCTION - runs after the component is unmounted
      document.title = "usePopcorn";
      console.log(`Clean up effect for movie ${title}`);
      //JAVASCRIPT CLOSURE - a function will always remmeber all
      //the variables that were present at the time and place that the function was created
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={poster !== "N/A" ? poster : IMAGE_NOT_FOUND_URL}
              alt={`Poster of ${title}`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {watchedMovie ? (
                <b>
                  You rated this movie: {watchedMovie.userRating}
                  <span>⭐</span>
                </b>
              ) : (
                <>
                  <StarRating max={10} size={28} onSetRating={setUserRating} />

                  {userRating && (
                    <button className="btn-add" onClick={addToWatchedList}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default MovieDetails;
