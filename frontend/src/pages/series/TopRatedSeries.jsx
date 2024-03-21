import { useState, useEffect, useContext } from "react";
import { SeriesContext } from "../../context/SeriesContext";
import ElaCard from "../../components/ElaCard/ElaCard";
import Pagination from "../../components/Pagination";
import Banner from "../../components/banner/Banner";
import { movieUrl, options } from "../../components/fetchData/FetchData.jsx";

const OnTvSeries = () => {
  const { rated, setRated } = useContext(SeriesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredShow = rated.filter((item) => {
    const title = item.title || item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${movieUrl}/tv/top_rated?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();

        // Setze das mediaType-Feld für jede Serie
        const ratedWithMediaType = data.results.map((serie) => ({
          ...serie,
          mediaType: "tv",
        }));
        setRated(ratedWithMediaType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div style={{ textAlign: "center" }}>
      <Banner
        data={rated}
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
        {/* {rated.map((movie) => (
          <Cardcomponent
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            title={movie.name}
            date={movie.first_air_date}
            link={`/series-info/${movie.id}`}
          />
        ))} */}
        <ElaCard data={filteredShow} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default OnTvSeries;
