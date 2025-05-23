import { fetchMovieCast } from "../../film-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const { cast } = await fetchMovieCast(movieId);
        setMovieCast(cast);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {movieCast.length > 0 && (
        <ul className={css.cast_list}>
          {movieCast.map((actor) => {
            return (
              <li key={actor.id} className={css.cast_item}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt=""
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
          \
        </ul>
      )}
    </>
  );
}
