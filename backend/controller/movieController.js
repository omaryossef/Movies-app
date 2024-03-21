import userModel from "../models/userModel.js";

export const postFavoriteMovie = async (req, res) => {
  try {
    const { movieId, userId, imageUrl, title, isFavorite, isWatchlist } = await req.body;
    const user = await userModel.findById(userId);
    const filterMovie = user.movies.some((movie) => movie.movieId === movieId);
    if (filterMovie) {
      res.status(401).send("Movie duplicated");
    } else {
      user.movies.push({ movieId, title, imageUrl, isFavorite, isWatchlist });
      await user.save();
      res.status(201).send("Movie added");
    }
  } catch (error) {
    res.status(404).json("Error favorite movie");
  }
};

export const addCommentToMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const { comment, raiting } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movieIndex = user.movies.findIndex(
      (movie) => movie.movieId === movieId
    );

    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found" });
    }
    user.movies[movieIndex].comments = { raiting, comment };

    await user.save();

    return res.status(200).json(user.movies);
  } catch (error) {
    console.error("Error adding comment to movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/////
export const deleteCommentFromMovie = async (req, res) => {
  try {
    const { userId, movieId, commentId } = req.params;
    console.log("userId", userId);
    console.log("movieId", movieId);
    console.log("commentId", commentId);
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movieIndex = user.movies.findIndex(
      (movie) => movie.movieId === movieId
    );

    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const movie = user.movies[movieIndex];

    // Check if the comments object exists
    if (!movie.comments) {
      return res.status(404).json({ error: "Comments not found" });
    }
    console.log(movie.comments);

    // Delete the comments object from the movie object
    movie.comments.comment = undefined;

    await user.save();

    return res.status(200).json({ message: "Comments deleted successfully" });
  } catch (error) {
    console.error("Error deleting comments from movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

////
export const deleteMovie = async (req, res) => {
  try {
    const { userId, movieId } = await req.params;
    const user = await userModel.findById(userId);

    const indexMovie = user.movies.findIndex(
      (item) => item.movieId === movieId
    );
    if (indexMovie === -1) {
      return res.status(501).send("Movie not found");
    }

    const deleteItem = user.movies.splice(indexMovie, 1);
    await user.save();
    res.status(200).send(deleteItem);
  } catch (error) {
    console.log("error", error);
    res.status(500).json("error delete movie");
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const userId = await req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("user not found");
    } else {
      res.status(200).json(user.movies);
    }
  } catch (error) {
    res.status(404).json("error get all movies");
  }
};
