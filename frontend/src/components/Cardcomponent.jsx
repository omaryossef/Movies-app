import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function Cardcomponent({
  src,
  imageUrl,
  title,
  date,
  link,
  cardId,
  userId,
  movieTitle,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    console.log("clicked");
    setOpenMenu(!openMenu);
  };
  const favoriteHanlder = async () => {
    try {
      const movieRes = await axios.post(
        " http://localhost:3000/favorite-movie",
        {
          title: movieTitle,
          movieId: cardId.toString(),
          userId: userId,
          imageUrl: imageUrl,
          isFavorite: true,
          isWatchlist: false,
        },
        { withCredentials: true }
      );
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
  const watchlistHandler = async () => {
    try {
      const movieRes = await axios.post(
        " http://localhost:3000/favorite-movie",
        {
          title: movieTitle,
          movieId: cardId.toString(),
          imageUrl: imageUrl,
          userId: userId,
          isFavorite: false,
          isWatchlist: true,
        },
        { withCredentials: true }
      );
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
    <div>
      <Card
        className="w-full max-w-[16rem]   shadow-lg "
        style={{ filter: openMenu ? "blur(4px)" : "none" }}
      >
        <CardHeader floated={false} color="blue-gray">
          <img
            src={src}
            alt="ui/ux review check"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <Menu>
            <MenuHandler>
              <IconButton
                size="sm"
                color="white"
                variant="text"
                className="bg-gray-500 !absolute top-4 right-4 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={handleClick}
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
                onClick={() => favoriteHanlder()}
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
                onClick={() => watchlistHandler()}
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
        </CardHeader>
        <Link to={link}>
          <CardBody>
            <div className="h-20  flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                {title}
              </Typography>
            </div>
            <Typography color="gray">{date}</Typography>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
}

export default Cardcomponent;
