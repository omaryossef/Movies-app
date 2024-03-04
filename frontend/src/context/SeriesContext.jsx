import { createContext, useState, useContext } from "react";

export const SeriesContext = createContext();

export const SeriesProvider = ({ children }) => {
  const [aring, setAring] = useState([]);
  const [onTv, setOnTv] = useState([]);
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState("");
  const [seriesId, setSeriesId] = useState();
  // console.log("seriesInfo", seriesInfo);

  const fetchDataAring = async () => {
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
        "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
        options
      );
      const data = await response.json();
      setAring(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSeriesInfo = async () => {
    if (seriesId) {
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
          `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`,
          options
        );
        const data = await response.json();
        setSeriesInfo(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <SeriesContext.Provider
      value={{
        aring,
        setAring,
        onTv,
        setOnTv,
        popular,
        setPopular,
        rated,
        setRated,
        seriesInfo,
        setSeriesInfo,
        fetchDataAring,
        seriesId,
        setSeriesId,
        fetchSeriesInfo,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
};

// export function useSeries() {
//     return useContext(SeriesContext);
//   }
