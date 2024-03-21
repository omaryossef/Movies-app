import { useState, useEffect, useContext } from "react";
import { SeriesContext } from "../../context/SeriesContext";
import ElaCard from "../../components/ElaCard/ElaCard";
import Pagination from "../../components/Pagination";
import Banner from "../../components/banner/Banner";
import { movieUrl, options } from "../../components/fetchData/FetchData.jsx";

function OnTvSeries() {
  const { onTv, setOnTv } = useContext(SeriesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${movieUrl}/tv/on_the_air?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();

        // Setze das mediaType-Feld für jede Serie
        const onTvWithMediaType = data.results.map((serie) => ({
          ...serie,
          mediaType: "tv",
        }));

        setOnTv(onTvWithMediaType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);
  const filteredShow = onTv.filter((item) => {
    const title = item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  console.log(onTv);
  return (
    <div style={{ textAlign: "center" }}>
      <Banner
        data={onTv}
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
        {/* {onTv.map((movie) => (
          <Cardcomponent
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            title={movie.name}
            date={movie.first_air_date}
            link={`/series-info/${movie.id}`}
            mediaType="tv" // Setze das mediaType-Feld
          />
        ))} */}
        <ElaCard data={filteredShow} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default OnTvSeries;
