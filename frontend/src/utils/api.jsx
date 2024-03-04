import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yzc0Y2I0N2Y5MzdiYWJhOWYwMzc1YjQyOTc3NjY1NyIsInN1YiI6IjY1N2IzODlmZWEzOTQ5MDBlMWU4NjdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SU3jsUPAW6LyhQWVMk26f1N-pIoFkS_ZQ6ikIQD4AlE";

const headers = {
    // Authorization: "Bearer" + TMDB_TOKEN
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (error) {
        console.error("Error fetching data from API", error);
        return null;
    }
};
