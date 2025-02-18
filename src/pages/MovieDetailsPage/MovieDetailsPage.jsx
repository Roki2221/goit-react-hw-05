import { fetchSpecificMovie } from "../../film-api";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieData, setMovieData] = useState({});
  const { movieId } = useParams();
  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);

        console.log(movieId);
        const data = await fetchSpecificMovie(movieId);
        setMovieData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    console.log(2);
    fetchMovie();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <Link to="/">Go back</Link>
      {Object.keys(movieData).length > 0 && (
        <div>
          <div className={css.main_info_container}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt=""
              />
            </div>
            <div className={css.movie_info_text}>
              <h2>
                {movieData.title}({movieData.release_date.split("-")[0]})
              </h2>
              <p>User Score: {movieData.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movieData.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movieData.genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to={"cast"}>Cast</Link>
              </li>
              <li>
                <Link to={"reviews"}>Reviews</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}
