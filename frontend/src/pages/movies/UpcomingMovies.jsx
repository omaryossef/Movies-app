import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import ElaCard from "../../components/ElaCard/ElaCard";
import Banner from "../../components/banner/Banner";
import { movieUrl, options } from "../../components/fetchData/FetchData";

function UpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = movies.filter((item) => {
    const title = item.title || item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${movieUrl}/movie/upcoming?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();

        // Setze das mediaType-Feld für jeden Film
        const upcomingWithMediaType = data.results.map((movie) => ({
          ...movie,
          mediaType: "movie",
        }));
        setMovies(upcomingWithMediaType);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <div style={{ textAlign: "center" }}>
      <Banner
        data={movies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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
        <ElaCard data={filteredMovies} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default UpcomingMovies;
