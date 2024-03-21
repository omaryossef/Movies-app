import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  // movieId:
  raiting: Number,
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const UserModel = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    isAdmin: { type: Boolean, default: false },
    // adminEmail: { type: String, default: "admin@mail.com" },
    // adminPwd: { type: String, required: true },
    movies: [
      {
        title: String,
        movieId: String,
        imageUrl: String,
        isFavorite: Boolean,
        isWatchlist: Boolean,
        comments: commentSchema,
      },
    ],
  },
  { timestamps: true }
);
//"todo" : admin mode verpessern 
export default mongoose.model("user", UserModel);
