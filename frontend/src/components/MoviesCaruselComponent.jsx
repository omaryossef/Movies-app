/* eslint-disable react/prop-types */
import React, { useContext } from "react";
// import { Carousel, Typography, Button } from "@material-tailwind/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MoviesContext } from "../context/MoviesContext.jsx";
import { SeriesContext } from "../context/SeriesContext.jsx";
function MoviesCaruselComponent({ items }) {
  const { movieId, setMovieId } = useContext(MoviesContext);
  const { seriesId, setSeriesId } = useContext(SeriesContext);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const openMovie = (movieId) => {
    document.documentElement.scrollTo(0, 0);
    setMovieId(movieId);
  };
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Carousel responsive={responsive}>
        {items.map((movie) => (
          <div
            // style={{ width: "400px" }}
            key={movie.id}
            onClick={() => openMovie(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="carousel-image"
              style={{
                width: "450px",
                height: "auto",
                padding: "5px",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MoviesCaruselComponent;
