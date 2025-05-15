import { fetchSearchedMovie } from "../../film-api";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [moviesList, setMoviesList] = useState([]);

  const fetchFilmsList = async (query) => {
    console.log("swcond");
    const response = await fetchSearchedMovie(query);
    const { results } = response;
    if (results.length === 0) {
      alert("No results found");
      return;
    }
    setMoviesList(results);
  };

  const handleSubmit = (e) => {
    console.log("first");

    e.preventDefault();
    fetchFilmsList(e.currentTarget.elements.movieName.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="movieName" />
      <button type="submit">search</button>
      {console.log(moviesList)}
      {moviesList.length > 0 && <MovieList trendingFilmsList={moviesList} />}
    </form>
  );
}
