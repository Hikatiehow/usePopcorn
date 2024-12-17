import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Box from "./Box";
import SearchBox from "./SearchBox";
import NumResults from "./NumResults";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";
import WatchedSummary from "./WatchedSummary";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const APIKEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return storedValue ? JSON.parse(storedValue) : [];
  // });

  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  function onCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatchedMovie(movie) {
    const exists = watched.some((item) => item.imdbID === movie.imdbID);
    !exists && setWatched((oldWatched) => [...oldWatched, movie]);
  }

  function handleDelete(movieID) {
    setWatched((oldWatched) =>
      oldWatched.filter((movie) => movie.imdbID != movieID)
    );
  }

  function handleSelectedID(id) {
    setSelectedID((currSelectedID) => (currSelectedID === id ? null : id));
  }

  // useEffect(
  //   //HAVING THIS IN AN EFFECT RATHER THAN UPDATING LOCAL STORAGE IN HANDLE ADD ALLOWS US
  //   //TO NOT HAVE TO WRITE DELETE LOGIC IN HANDLE DELETE
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching Movies");
        }
        const data = await res.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error("Movie not Found");
        }
        setMovies(data.Search);
        console.log(data.Search);
      } catch (error) {
        console.log(error.message);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 1) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <NavBar>
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              setSelectedID={(id) => handleSelectedID(id)}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <>
            {selectedID ? (
              <MovieDetails
                selectedID={selectedID}
                onCloseMovie={onCloseMovie}
                handleAddWatchedMovie={handleAddWatchedMovie}
                watchedMovies={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedList watched={watched} onDeleteItem={handleDelete} />
              </>
            )}
          </>
        </Box>
      </main>
    </>
  );
}
