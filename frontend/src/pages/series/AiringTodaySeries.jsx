import { useState, useEffect, useContext } from "react";
import { SeriesContext } from "../../context/SeriesContext";
import ElaCard from "../../components/ElaCard/ElaCard";
import Pagination from "../../components/Pagination";
import Banner from "../../components/banner/Banner";
import { options, movieUrl } from "../../components/fetchData/FetchData.jsx";

function AiringTodaySeries() {
  const { aring, setAring } = useContext(SeriesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${movieUrl}/tv/airing_today?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();

        // Setze das mediaType-Feld für jede Serie
        const airingWithMediaType = data.results.map((serie) => ({
          ...serie,
          mediaType: "tv",
        }));
        setAring(airingWithMediaType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredShows = aring.filter((item) => {
    const title = item.title || item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Banner
        data={aring}
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
        <ElaCard data={filteredShows} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default AiringTodaySeries;
