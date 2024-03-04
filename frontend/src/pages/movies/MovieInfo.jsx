import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieInfo() {
  const [movieInfo, setMovieInfo] = useState(null);
  const { id } = useParams() ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI'
          }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const data = await response.json();
        setMovieInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);



  


  const goBack = () => {
    window.history.back();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Movie Infos</h1>
      {movieInfo ? (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${movieInfo.poster_path}`}
            alt={movieInfo.title}
            style={{ width: "10%", height: "auto", borderRadius: "8px" }}
          />
          <h3>{movieInfo.title}</h3>
          <p>{movieInfo.overview}</p>
         <p>{movieInfo.production_companies[0].name}</p>
          <p>{movieInfo.budget} $</p>
          <button onClick={() => goBack()}>Go Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieInfo;