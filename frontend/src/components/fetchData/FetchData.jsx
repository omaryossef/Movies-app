export const movieUrl = "https://api.themoviedb.org/3";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
  },
};
// export const fetchData = async (mediaType, endpoint, currentPage, setState) => {
//   try {
//     const response = await fetch(
//       `${movieUrl}/${mediaType}/${endpoint}?language=en-US&page=${currentPage}`,
//       options
//     );
//     const data = await response.json();
//     setState(data.results);
//   } catch (error) {
//     console.error(error);
//   }
// };
