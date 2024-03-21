import { useState, useEffect } from "react";
import ElaCard from "../../components/ElaCard/ElaCard";
import Banner from "../../components/banner/Banner";
import Pagination from "../../components/Pagination";
import { options, movieUrl } from "../../components/fetchData/FetchData.jsx";

function UpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${movieUrl}/movie/upcoming?language=en-US&page=${currentPage}`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming movies");
        }
        const data = await response.json();

        // Setze das mediaType-Feld für jeden Film
        const upcomingWithMediaType = data.results.map((movie) => ({
          ...movie,
          mediaType: "movie",
        }));
        setMovies(upcomingWithMediaType);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredMovies = movies.filter((item) => {
    const title = item.title || item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Banner
        data={movies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default UpcomingMovies;
