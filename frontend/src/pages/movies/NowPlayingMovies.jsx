import React, { useState, useEffect, useContext } from "react";
import Cardcomponent from "../../components/Cardcomponent";
import Pagination from "../../components/Pagination";
import { UserContext } from "../../context/UserContext";
import BannerHome from "../../components/bannerHome/BannerHome";
function NowPlayingMovies() {
  const [play, setPlay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdlMDBkMTIyZDg0MmZlZTYwYzFlNWY1MzUwZWVkNCIsInN1YiI6IjY1MmE2Yjk5MWYzZTYwMDExYzRhMmNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27Of1P9G1YQOX5RsHqMkoga3b6WelSSkdIblIqP19YY",
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPlay(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);
  return (
    <div style={{ textAlign: "center" }}>
      <BannerHome />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {play.map((movie) => (
          <Cardcomponent
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            title={movie.title}
            date={movie.release_date}
            link={`/movies-info/${movie.id}`}
            cardId={movie.id}
            userId={user?._id}
            movieTitle={movie.title}
            imageUrl={movie.poster_path}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default NowPlayingMovies;
