import { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { MoviesContext } from "../context/MoviesContext.jsx";
import { movieUrl, options } from "./fetchData/FetchData.jsx";

function VideoPlayer() {
  const { movieId, setMovieId } = useContext(MoviesContext);
  const [movieVideo, setMovieVideo] = useState();

  const fetchMovieById = async () => {
    try {
      if (movieId) {
        const response = await fetch(
          `${movieUrl}/movie/${movieId}/videos?language=en-US`,
          options
        );

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
