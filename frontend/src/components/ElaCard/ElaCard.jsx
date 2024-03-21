import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ElaCard = ({ data, mediaType }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    
    setOpenMenu(!openMenu);
  };
  const favoriteHanlder = async (movieTitle, cardId, userId, imageUrl) => {
    try {
      const movieRes = await axios.post("/favorite-movie", {
        title: movieTitle,
        movieId: cardId.toString(),
        userId: userId,
        imageUrl: imageUrl,
        isFavorite: true,
        isWatchlist: false,
      });
      if (movieRes.status === 201) {
        // Check if the movie is already in the user's list
        if (!user.movies.some((movie) => movie?.movieId === cardId)) {
          // Add the movie to the user's list
          setUser((prevUser) => ({
            ...prevUser,
            movies: [
              ...prevUser.movies,
              {
                title: movieTitle,
                movieId: cardId,
                imageUrl: imageUrl,
                isFavorite: true,
              },
            ],
          }));
          setOpenMenu(!openMenu);
        }
      } else {
        // Movie already exists in user's list
        console.log("Movie already exists in user's list");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const watchlistHandler = async (movieTitle, cardId, userId, imageUrl) => {
    try {
      const movieRes = await axios.post("/favorite-movie", {
        title: movieTitle,
        movieId: cardId.toString(),
        imageUrl: imageUrl,
        userId: userId,
        isWatchlist: true,
      });
      if (movieRes.status === 201) {
        // Check if the movie is already in the user's list
        if (!user.movies.some((movie) => movie?.movieId === cardId)) {
          // Add the movie to the user's list
          setUser((prevUser) => ({
            ...prevUser,
            movies: [
              ...prevUser.movies,
              {
                title: movieTitle,
                movieId: cardId,
                imageUrl: imageUrl,
                isFavorite: true,
                isWatchlist: false,
              },
            ],
          }));
          setOpenMenu(!openMenu);
        }
      } else {
        // Movie already exists in user's list
        console.log("Movie already exists in user's list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="carousel">
      {
        <div className="carouselItems">
          {data?.map((item) => {
            return (
              <div
                className="carouselItem"
                key={item.id}
                style={{ filter: openMenu ? "blur(4px)" : "none" }}
              >
                <div className="posterBlock">
                  <img
                    className="lazy-load-image-background"
                    src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                    alt={item.title || item.name}
                    onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                  />
                  <CircleRating
                    rating={
                      item && item.vote_average
                        ? item.vote_average.toFixed(1)
                        : 0
                    }
                  />
                  <Menu>
                    <MenuHandler>
                      <IconButton
                        size="sm"
                        color="white"
                        variant="text"
                        className="bg-tranparent !absolute top-4 right-4 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-9 h-9 border-2 text-5xl font-bold text-orange-700 border-orange-700 rounded-full p-1 bg-transparent hover:bg-orange-700 hover:text-white hover:font-bold transition-all duration-300 ease-in-out"
                          onClick={() => handleClick()}
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </IconButton>
                    </MenuHandler>

                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          favoriteHanlder(
                            item.title || item.name,
                            item.id,
                            user?._id,
                            item.poster_path
                          )
                        }
                        className="flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          color="red"
                          className="w-6 h-6 "
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>

                        <Typography variant="small" className="font-medium">
                          Favorite
                        </Typography>
                      </MenuItem>
                      <hr className="my-2" />
                      <MenuItem
                        onClick={() =>
                          watchlistHandler(
                            item.title || item.name,
                            item.id,
                            user?._id,
                            item.poster_path
                          )
                        }
                        className="flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <Typography variant="small" className="font-medium">
                          Watchlist
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="textBlock">
                  <span className="title">{item.title || item.name}</span>
                  <span className="date">
                    {dayjs(item.release_Date).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default ElaCard;
