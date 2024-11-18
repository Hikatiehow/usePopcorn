import WatchedListItem from "./WatchedListItem";

function WatchedList({ watched, onDeleteItem }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListItem
          movie={movie}
          key={movie.imdbID}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
}

export default WatchedList;
