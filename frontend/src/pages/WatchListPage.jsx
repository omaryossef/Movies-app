import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

function FavoritePage() {
  const { user, setUser } = useContext(UserContext);
  const deleteHandler = async (movieId) => {
    try {
      await axios.delete(`/delete-movie/${user._id}/${movieId}`);

      if (user?.movies.length !== 0) {
        const remainigMovies = user.movies.filter(
          (movie) => movie?.movieId !== movieId
        );
        setUser({ ...user, movies: remainigMovies });
      } else {
        console.error("error with deleted movie");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllmovies = async () => {
    if (user?.movies.length) {
      try {
        const moviesRes = await axios.get(`/get-movies/${user?._id}`);
        setUser({ ...user, movies: moviesRes.data });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAllmovies();
  }, []);

  return (
    <div className="flex flex-col   w-full mt-6 mx-4">
      {user?.movies
        .filter((movie) => movie.isWatchlist === true)
        .map((movie, index) => (
          <Card
            key={index}
            className="min-w-80 h-48 sm:h-60 md:w-full flex-row mb-2 md:mb-4 max-w-4xl place-self-center "
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 shrink-0 rounded-r-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${movie?.imageUrl}`}
                alt="card-image"
                className="h-1/2 sm:h-full object-fill"
              />
            </CardHeader>
            <CardBody className="flex flex-col justify-between">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-0 sm:mb-2 sm:text-xl text-lg resize-x"
              >
                {movie.title}
              </Typography>
              <div>
                <Button
                  onClick={() => deleteHandler(movie.movieId)}
                  color="green"
                  className="m-1 p-3 w-auto text-xs sm:text-sm"
                >
                  Move to favorite
                </Button>
                <Button
                  onClick={() => deleteHandler(movie.movieId)}
                  color="red"
                  className="m-1 p-3 w-auto text-xs sm:text-sm"
                >
                  Remove 
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}

export default FavoritePage;
