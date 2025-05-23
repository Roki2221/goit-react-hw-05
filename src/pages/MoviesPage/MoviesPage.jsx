import { fetchSearchedMovie } from "../../film-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation, useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
export default function MoviesPage() {
  const [moviesList, setMoviesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const fetchFilmsList = async (query) => {
    const response = await fetchSearchedMovie(query);
    const { results } = response;
    if (results.length === 0) {
      alert("No results found");
      return;
    }
    setMoviesList(results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.elements.movieName.value.trim();
    if (!query) return;

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("query", query);
    setSearchParams(updatedParams);
    fetchFilmsList(query);
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchFilmsList(query);
    }
  }, [searchParams]);

  return (
    <div className={css["movies-page"]}>
      <form onSubmit={handleSubmit} className={css["movies-page__form"]}>
        <input
          type="text"
          name="movieName"
          defaultValue={searchParams.get("query") || ""}
          className={css["movies-page__input"]}
        />
        <button type="submit" className={css["movies-page__button"]}>
          search
        </button>
      </form>
      {moviesList.length > 0 && (
        <div className={css["movies-page__list-container"]}>
          <MovieList trendingFilmsList={moviesList} location={location} />
        </div>
      )}
    </div>
  );
}
