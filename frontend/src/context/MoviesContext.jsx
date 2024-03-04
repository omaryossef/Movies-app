import { createContext, useState } from "react";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [movieId, setMovieId] = useState();
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopulatMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpCompingMovies] = useState([]);
  const [movieVideo, setMovieVideo] = useState();
  // console.log("movieId in context: ", movieId);
  const fetchPlayingMovies = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
        },
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      const data = await response.json();

      setNowPlayingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPopularMovies = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
        },
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      const data = await response.json();

      setPopulatMovies(data.results.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTopRatedMovies = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
        },
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      );
      const data = await response.json();

      setTopRatedMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUpComingMovies = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
        },
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      );
      const data = await response.json();
      // console.log(data);
      setUpCompingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMovieInfo = async () => {
    if (movieId) {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        const data = await response.json();
        setMovieInfo(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <MoviesContext.Provider
      value={{
        movieId,
        setMovieId,
        movieInfo,
        setMovieInfo,
        nowPlayingMovies,
        setNowPlayingMovies,
        popularMovies,
        setPopulatMovies,
        topRatedMovies,
        setTopRatedMovies,
        upComingMovies,
        setUpCompingMovies,
        movieVideo,
        setMovieVideo,
        fetchPlayingMovies,
        fetchUpComingMovies,
        fetchTopRatedMovies,
        fetchPopularMovies,
        fetchMovieInfo,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
