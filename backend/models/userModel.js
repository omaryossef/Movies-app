import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    movies: [
      {
        title: String,
        movieId: String,
        imageUrl: String,
        isFavorite: Boolean,
        isWatchlist: Boolean,
        //rating:string,
        //commit:string
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("user", UserModel);
