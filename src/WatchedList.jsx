import WatchedListItem from "./WatchedListItem";

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedList;
