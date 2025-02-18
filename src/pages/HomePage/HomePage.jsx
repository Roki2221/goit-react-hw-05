import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../film-api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [trendMovies, setTrendMovies] = useState([]);
  useEffect(() => {
    async function fetchFilms() {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setTrendMovies(data.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchFilms();
  }, []);
  return (
    <>
      <h2>Trending today</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {trendMovies.length > 0 && <MovieList trendingFilmsList={trendMovies} />}
    </>
  );
}
