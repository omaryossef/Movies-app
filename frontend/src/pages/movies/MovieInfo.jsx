import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "../../components/details/detailsBanner/DetailsBanner.jsx";
import { options, movieUrl } from "../../components/fetchData/FetchData.jsx";
import Cast from "../../components/details/cast/Cast.jsx";
import VideosSection from "../../components/details/videosSection/VideosSection.jsx";
import Similar from "../../components/details/carousels/Similar.jsx";
import Recommendation from "../../components/details/carousels/Recommendation.jsx";

function MovieInfo() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const { mediaType, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `${movieUrl}/${mediaType}/${id}?language=en-US`,
          options
        );
        const movieData = await movieResponse.json();
        setMovieInfo(movieData);

        // Fetch credits
        const creditsResponse = await fetch(
          `${movieUrl}/${mediaType}/${id}/credits?language=en-US`,
          options
        );
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);

        // Fetch videos
        const videosResponse = await fetch(
          `${movieUrl}/${mediaType}/${id}/videos?language=en-US`,
          options
        );
        const videosData = await videosResponse.json();
        setVideos(videosData);

         // Fetch similar movies
         const similarResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US`,
          options
      );
      console.log(similarResponse);

      const similarData = await similarResponse.json();
      console.log(similarData);
      setSimilar(similarData);

      // Fetch recommendation movies
      const recommendationResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?language=en-US`, options);
          console.log(recommendationResponse);
          const recommendationData = await recommendationResponse.json();
          console.log(recommendationData);
          setRecommendation(recommendationData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [mediaType, id]);

  if (loading) {
    return <div>Laden...</div>;
  }

  return (
    <div>
      <DetailsBanner
        id={id}
        movieInfo={movieInfo}
        crew={credits?.crew}
        video={videos?.results?.[0]}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection
        movieInfo={movieInfo}
        loading={loading}
        video={videos?.results} // Übergeben  die Videos-Prop an die VideoSection-Komponente
        id={id} // Übergeben die ID an die VideoSection-Komponente
      />
      <Similar 
        mediaType={mediaType}
        id={id}
        similarData={similar}
        loading={loading}
      />
      <Recommendation 
        mediaType={mediaType}
        id={id}
        recommendationData={recommendation}
        loading={loading}
      />
       
    </div>
  );
}

export default MovieInfo;
