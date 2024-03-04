import userModel from "../models/userModel.js";

export const postMovieId = async (req, res) => {
  const { id } = req.params;
  const { title, movieId, isfavorite, isWatchList } = req.body;
  try {
    const user = await userModel.findById(id);
    if (user) {
      // Check if any movie in the user's movies array has the same movieId
      const isDuplicateMovie = user.movies.some(
        (movie) => movie.movieId === movieId
      );
      if (isDuplicateMovie) {
        return res.status(409).json({ message: "Duplicate movie" });
      }

      // If not a duplicate, add the movie to the user's list
      user.movies.push({ title, movieId, isfavorite, isWatchList });
      await user.save(); // Save the changes to the user document
      return res.status(201).json({ message: "Movie added successfully" });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
