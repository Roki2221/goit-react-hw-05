import { fetchMovieReviews } from "../../film-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const { results } = await fetchMovieReviews(movieId);
        setMovieReviews(results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <>
      {console.log(movieReviews)}
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {console.log(movieReviews)}{" "}
      {movieReviews.length > 0 && (
        <ul>
          {movieReviews.map((review) => {
            return (
              <li key={review.id} className={css.Reviews_item}>
                <h4>{review.author}</h4>
                <p>Character: {review.content}</p>
              </li>
            );
          })}
          \
        </ul>
      )}
    </>
  );
}
