import { createContext, useState } from "react";
import { movieUrl, options } from "../components/fetchData/FetchData.jsx";
export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [movieId, setMovieId] = useState();
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopulatMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpCompingMovies] = useState([]);
  const [movieVideo, setMovieVideo] = useState();
  const setMovies = {
    nowPlaying: setNowPlayingMovies,
    popular: setPopulatMovies,
    topRated: setTopRatedMovies,
    upcoming: setUpCompingMovies,
    movieInfo: setMovieInfo,
  };
  const fetchMovies = async (type, movieId) => {
    let url = `${movieUrl}/movie/`;
    switch (type) {
      case "nowPlaying":
        url += "now_playing";
        break;
      case "popular":
        url += "popular";
        break;
      case "topRated":
        url += "top_rated";
        break;
      case "upcoming":
        url += "upcoming";
        break;
      case "movieInfo":
        if (!movieId) return;
        url += `${movieId}`;
        break;
      default:
        return;
    }
    url += "?language=en-US&page=1";

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (type === "popular") {
        setMovies[type](data.results.reverse());
      } else if (type === "movieInfo") {
        setMovies[type](data);
      } else {
        setMovies[type](data.results);
      }
    } catch (error) {
      console.error(error);
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
        fetchMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
