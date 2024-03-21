import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import axios from "axios";

function FavoritePage() {
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState({});
  // const [klicked, setcklicked] = useState(false); // soll zukunft in context sein damit verwinden wir all comments and zeigen
  const [clickedComments, setClickedComments] = useState({});
  const [raitingValue, setRaitingValue] = useState(0);

  const commentHandler = async (movieId) => {
    try {
      const movieRes = await axios.post(
        `/update-movie/${user._id}/${movieId}`,
        {
          comment: comments[movieId],
          raiting: Number(raitingValue),
        }
      );
      if (movieRes.status === 200) {
        // Check if the movie is already in the user's list
        if (user?.movies?.find((movie) => movie?.movieId === movieId)) {
          // Add the movie to the user's list
          setComments((prevComments) => ({
            ...prevComments,
            [movieId]: comments[movieId],
          }));

          setRaitingValue(0);
          setClickedComments((prevClickedComments) => ({
            ...prevClickedComments,
            [movieId]: false,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (movieId) => {
    try {
      const response = await axios.delete(
        `/delete-movie/${user._id}/${movieId}`
      );
      if (response) {
        console.log("movie deleted successfully");
      }
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

  return (
    <div className="flex flex-col  w-full mt-6">
      {user?.movies
        .filter((movie) => movie.isFavorite === true)
        .map((movie, index) => (
          <Card
            key={index}
            className="min-w-80 h-48 sm:h-60 md:w-full flex-row mb-2 md:mb-4 max-w-4xl place-self-center"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 shrink-0 rounded-r-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${movie?.imageUrl}`}
                alt="movie-image"
                className="h-1/2 sm:h-full object-fill"
              />
            </CardHeader>
            <CardBody>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-0 sm:mb-2 sm:text-xl text-lg resize-x"
              >
                {movie.title}
              </Typography>
              <Rating
                className="mb-0 sm:mb-2 h-4"
                value={raitingValue}
                onChange={(raitingValue) => setRaitingValue(raitingValue)}
                onClick={() => commentHandler(movie.movieId)}
              />
              {!clickedComments[movie.movieId] ? (
                <>
                  <Typography className=" h-14 sm:h-16 mb-0 md:mb-8 sm:text-md font-bold text-lg overflow-auto">
                    {comments[movie.movieId]
                      ? comments[movie.movieId]
                      : "Write a comment ..."}
                  </Typography>
                  <Button
                    color="blue"
                    className="m-1 p-3 w-auto md:w-36 text-xs sm:text-sm"
                    onClick={() =>
                      setClickedComments({
                        ...clickedComments,
                        [movie.movieId]: true,
                      })
                    }
                  >
                    comment
                  </Button>
                </>
              ) : (
                <>
                  <Typography className="h-12 mb-1 md:mb-8 font-normal ">
                    <textarea
                      className="w-full border border-gray-400 font-bold font-bold text-lg sm:text-sm"
                      value={comments[movie.movieId] || ""}
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [movie.movieId]: e.target.value,
                        })
                      }
                    />
                  </Typography>
                  <Button
                    className="m-1 p-3 w-auto md:w-36 text-xs sm:text-sm"
                    onClick={() => commentHandler(movie.movieId)}
                  >
                    save
                  </Button>
                </>
              )}
              <Button
                onClick={() => deleteHandler(movie.movieId)}
                color="red"
                className="m-1 p-3 w-auto md:w-36 text-xs sm:text-sm"
              >
                delete
              </Button>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}

export default FavoritePage;
