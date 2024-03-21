import { Typography, Avatar, IconButton } from "@material-tailwind/react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../styles/communityPage.css";
import { UserContext } from "../context/UserContext";

export function RatingWithComment() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const [movieIds, setMoviesIds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [deletedComment, setDeletedcoment] = useState(false);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const usersResponse = await axios.get("/get-all");
        if (usersResponse.status === 200) {
          usersResponse.data.forEach((user) => {
            user.movies.forEach((movie) => {
              const movieId = movie.movieId;
              if (!movieIds.includes(movieId)) {
                movieIds.push(movieId);
              }
              return movieIds;
            });
          });
          setUsers(usersResponse.data);
          setMoviesIds(movieIds);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllUser();
  }, [deletedComment]);

  const deleteComment = async (userId, movieId, commentId) => {
    try {
      const response = await axios.delete(
        `/delete-comment/${userId}/${movieId}/${commentId}`
      );
      console.log("response", response);
      setDeletedcoment(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {users.map((userInfo) =>
        userInfo.movies.map((movie) => {
          return (
            movie.comments && (
              <div
                className="community-container"
                style={{ justifyContent: user.isAdmin ? "space-between" : "" }}
                key={movie._id}
              >
                <div className="community-box">
                  <Avatar src={userInfo?.image} alt="image" size="lg" />
                  <Typography variant="h6" className="mt-4">
                    {userInfo.username}
                  </Typography>
                  <Typography>
                    {new Date(movie.comments?.createdAt).toLocaleDateString(
                      "de"
                    )}
                  </Typography>
                </div>
                <div
                  className="truncate ..."
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" color="blue">
                      @{movie.title || movie.name}
                    </Typography>

                    <Rating
                      name="read-only"
                      size="small"
                      value={movie.comments?.raiting || 0}
                      readOnly
                    />
                  </div>
                  <Typography
                    className="truncate ..."
                    variant="paragraph"
                    color="blue-gray"
                  >
                    &quot; {movie.comments?.comment} &quot;
                  </Typography>
                </div>
                {user?.isAdmin && (
                  <IconButton
                    color="red"
                    className="rounded-full"
                    onClick={() =>
                      deleteComment(
                        userInfo._id,
                        movie?.movieId,
                        movie?.comments?._id
                      )
                    }
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </IconButton>
                )}
              </div>
            )
          );
        })
      )}
    </>
  );
}
