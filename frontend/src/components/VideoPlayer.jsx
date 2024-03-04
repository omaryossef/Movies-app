import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { MoviesContext } from "../context/MoviesContext.jsx";

function VideoPlayer() {
  const { movieId, setMovieId } = useContext(MoviesContext);
  const [movieVideo, setMovieVideo] = useState();

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

        if (response.data.results && response.data.results.length > 0) {
          for (const video of response.data.results) {
            if (video.type === "Trailer") {
              setMovieVideo(video.key);
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

  return (
    <ReactPlayer
      url="<https://www.youtube.com/watch?v=ysz5S6PUM-U>"
      width="640"
      height="360"
      controls
    />
  );
}

export default VideoPlayer;
