import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SeriesContext } from "../../context/SeriesContext";

function SeriesInfo() {
  const { seriesInfo, setSeriesInfo, fetchSeriesInfo } =
    useContext(SeriesContext);
  const { id } = useParams();
  console.log(seriesInfo);
  useEffect(() => {
    const fetchSeriesInfo = async () => {
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
          `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
          options
        );
        const data = await response.json();
        setSeriesInfo(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeriesInfo();
  }, [id]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Series Infos</h1>
      {seriesInfo ? (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${seriesInfo.poster_path}`}
            alt={seriesInfo.title}
            style={{ width: "10%", height: "auto", borderRadius: "8px" }}
          />
          <h3>{seriesInfo.name}</h3>
          <p>{seriesInfo.first_air_date}</p>
          <p>{seriesInfo.overview}</p>

          <button onClick={() => goBack()}>Go Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SeriesInfo;
