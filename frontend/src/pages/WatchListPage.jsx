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
      const response = await axios.delete(
        `http://localhost:3000/delete-movie/${movieId}/${user._id}`
      );

      if (user?.movies.length !== 0) {
        console.log("user.movies", user.movies);
        const remainigMovies = user.movies.filter(
          (movie) => movie?.movieId !== movieId
        );
        console.log("remainigMovies", remainigMovies);
        setUser({ ...user, movies: remainigMovies });
      } else {
        console.error("error with deleted movie");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getAllmovies = async () => {
      if (user?.movies.length) {
        try {
          const moviesRes = await axios.get(
            `http://localhost:3000/get-movies/${user?._id}`
          );
          console.log(moviesRes.data);
          setUser({ ...user, movies: moviesRes.data });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getAllmovies();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {user?.movies
        .filter((movie) => movie.isWatchlist === true)
        .map((movie, index) => (
          <Card
            key={index}
            className="h-48   flex-row "
            style={{ width: "60%", margin: "20px" }}
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 shrink-0 rounded-r-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${movie?.imageUrl}`}
                alt="card-image"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                {movie.title}
              </Typography>
              {/* <Typography color="blue-gray" className="mb-2 ">
                {overview}...
              </Typography> */}

              <a href="#" className="inline-block">
                <Button
                  onClick={() => deleteHandler(movie.movieId)}
                  color="red"
                  variant="text"
                  className="flex items-center gap-2"
                >
                  delete
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}

export default FavoritePage;
