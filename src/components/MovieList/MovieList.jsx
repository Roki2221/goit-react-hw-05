import { Link, useLocation } from "react-router-dom";

export default function MovieList({ trendingFilmsList }) {
  const location = useLocation();
  console.log(location);
  return (
    <ul>
      {trendingFilmsList.map((film) => {
        return (
          <li key={film.id}>
            <Link
              to={`/movies/${film.id}`}
              state={`${location.pathname}${location.search}`}
            >
              {film.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
