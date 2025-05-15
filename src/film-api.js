import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDI0ZTUzYjZiOTEyNTUzMjUxZGFhNTkwYmQzYzhmZCIsIm5iZiI6MTcwODIxMDEyNy42NzM5OTk4LCJzdWIiOiI2NWQxMzdjZmI0MjI0MjAxODdiMWZjYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ejcoaHHffBS_GUONOKAhZJpcSpUD_viEehCUAPRwisw",
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    "trending/movie/day?language=en-US",
    options
  );
  return response.data;
};

export const fetchSpecificMovie = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data;
};

export const fetchSearchedMovie = async (query) => {
  const response = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};
