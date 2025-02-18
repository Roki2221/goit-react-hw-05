import { Link } from "react-router-dom";

export default function MovieList({ trendingFilmsList }) {
  console.log(trendingFilmsList);
  return (
    <ul>
      {trendingFilmsList.map((film) => {
        return (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`}>{film.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
