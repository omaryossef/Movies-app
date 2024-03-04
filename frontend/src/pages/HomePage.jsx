import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../components/SidebarWithBurgerMenu.jsx";
import { Outlet } from "react-router-dom";
import CaruselComponent from "../components/CaruselComponent.jsx";
import { MoviesContext } from "../context/MoviesContext.jsx";
import { SeriesContext } from "../context/SeriesContext.jsx";
import "../styles/homePage.css";
import MoviesCaruselComponent from "../components/MoviesCaruselComponent.jsx";
import SeriesCaruselComponent from "../components/SeriesCaruselComponent.jsx";
import { UserContext } from "../context/UserContext.jsx";
function HomePage() {
  const {
    rated,
    setRated,
    popular,
    setPopular,
    onTv,
    setOnTv,
    aring,
    fetchDataAring,
  } = useContext(SeriesContext);
  // const {id} = useParams()
  const { seriesId, setSeriesId, seriesInfo, setSeriesInfo, fetchSeriesInfo } =
    useContext(SeriesContext);
  // console.log("seriesInfo in home", seriesInfo);
  const [seriesVideo, setSeriesVideo] = useState();
  const {
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
  } = useContext(MoviesContext);
  // console.log("movieId in home: ", movieId);
  const [trail, setTrail] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetchDataAring();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
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
          "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setOnTv(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
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
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setPopular(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
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
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setRated(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchSeriesByID = async () => {
    try {
      if (seriesId) {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`,
          options
        );
        const data = await response.json();

        console.log("SERIES ID", seriesId);
        console.log("DATA", data);
        if (data.results && data.results.length === 0) {
          setTrail(true);
        }
        if (data.results && data.results.length > 0) {
          for (const video of data.results) {
            console.log("Video", video);
            setSeriesVideo(video.key);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching series by ID:", error);
    }
  };

  useEffect(() => {
    fetchPlayingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpComingMovies();
  }, []);
  //
  useEffect(() => {
    const handleScroll = () => {
      // Your scroll event logic here
      // setMovieId("");
      // setSeriesId("");
      setTrail(false);
      setMovieVideo(undefined);
      setSeriesVideo(undefined);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const fetchMovieById = async () => {
    try {
      if (movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const headers = {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdlMDBkMTIyZDg0MmZlZTYwYzFlNWY1MzUwZWVkNCIsInN1YiI6IjY1MmE2Yjk5MWYzZTYwMDExYzRhMmNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27Of1P9G1YQOX5RsHqMkoga3b6WelSSkdIblIqP19YY",
        };

        const response = await axios.get(url, { headers });
        console.log("response", response);
        if (response.data.results && response.data.results.length > 0) {
          for (const video of response.data.results) {
            if (video.type === "Trailer") {
              setMovieVideo(video.key);
              console.log("movie Video", movieVideo);

              return;
            }
          }
        }

        console.error("No trailer found for the movie.");
      }
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
    }
  };

  useEffect(() => {
    fetchSeriesInfo();
    fetchSeriesByID();
  }, [seriesId]);
  useEffect(() => {
    fetchMovieInfo();
    fetchMovieById();
  }, [movieId]);
  // console.log("movieInfo", movieInfo);

  return (
    <>
      {movieVideo && (
        <div className="movie-box">
          {movieInfo && (
            <div>
              <h1 className="headline-home">{movieInfo.title}</h1>
              <p className="home-paragraph">{movieInfo.overview}</p>
              {/* <p>{movieInfo.production_companies[0].name}</p> */}
              <p>{movieInfo.budget} $</p>
            </div>
          )}
          <div className="home-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieVideo}`}
              playing={true}
              controls
              muted={true}
              width={"800px"}
              height={"100%"}
            />
          </div>
        </div>
      )}
      {seriesVideo ? (
        <div className="movie-box">
          {seriesInfo && (
            <div>
              <h1 className="headline-home">{seriesInfo.name}</h1>
              <p className="home-paragraph">{seriesInfo.overview}</p>
              {/* <p>{movieInfo.production_companies[0].name}</p> */}
              {/* <p>{seriesInfo.budget} $</p> */}
            </div>
          )}
          <div className="home-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${seriesVideo}`}
              playing={true}
              controls
              muted={true}
              width={"800px"}
              height={"100%"}
            />
          </div>
        </div>
      ) : (
        trail &&
        seriesInfo && (
          <div className="movie-box">
            {" "}
            <div>
              <h1 className="headline-home">{seriesInfo.name}</h1>
              <p className="home-paragraph">{seriesInfo.overview}</p>
            </div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${seriesInfo.poster_path}`}
                alt={seriesInfo.title}
              />
            </div>
          </div>
        )
      )}
      <div
        className="carusels-container"
        style={{
          marginTop: (movieVideo || seriesVideo || trail) && "520px",
        }}
      >
        <h2>Movies playing now </h2>
        <MoviesCaruselComponent items={nowPlayingMovies} />
        <h2>Popular Movies in our page </h2>
        <MoviesCaruselComponent items={popularMovies} />
        <h2>Top rated Movies </h2>
        <MoviesCaruselComponent items={topRatedMovies} />
        <h2>Movies comming soon </h2>
        <MoviesCaruselComponent items={upComingMovies} />
        <h2>Airing Today</h2>
        <SeriesCaruselComponent items={aring} />
        <h2>On TV</h2>
        <SeriesCaruselComponent items={onTv} />
        <h2>Popular Series</h2>
        <SeriesCaruselComponent items={popular} />
        <h2>Top Rated</h2>
        <SeriesCaruselComponent items={rated} />
        <Outlet />
      </div>
    </>
  );
}

export default HomePage;
