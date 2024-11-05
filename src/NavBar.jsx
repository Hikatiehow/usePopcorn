import Logo from "./Logo";
import NumResults from "./NumResults";
import SearchBox from "./SearchBox";

function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBox />
      <NumResults movies={movies} />
    </nav>
  );
}

export default NavBar;
