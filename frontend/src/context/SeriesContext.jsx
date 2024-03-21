import { createContext, useState } from "react";
import { movieUrl, options } from "../components/fetchData/FetchData";

export const SeriesContext = createContext();

export const SeriesProvider = ({ children }) => {
  const [aring, setAring] = useState([]);
  const [onTv, setOnTv] = useState([]);
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState("");
  const [seriesId, setSeriesId] = useState();

  const fetchDataAring = async () => {
    try {
      const response = await fetch(
        `${movieUrl}/tv/airing_today?language=en-US&page=1`,
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
        const response = await fetch(
          `${movieUrl}/tv/${seriesId}?language=en-US`,
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
