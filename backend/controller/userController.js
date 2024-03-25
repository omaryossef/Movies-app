import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const jwtSecret = "movie";

export const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10; // Anzahl der Runden für das Salz
    const salt = await bcrypt.genSalt(saltRounds); // Generierung des Salzes
    const hashedPassword = await bcrypt.hash(password, salt); // Hashen des Passworts
    const user = await userModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json(user);
    console.log("registration successful");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const postLoginUser = async (req, res) => {

  const { email, password } = await req.body;

  try {
    if (!email && !password) throw new Error("Please enter a valid email");
    if (email.trim() === "test@mail.com") {
      const user = await userModel.findOne({ email });
      console.log("user", user);
      console.log("user.email", user.email);
      if (user) {
        console.log("user found");
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
          console.log("password correct");
          user.isAdmin = true;
          await user.save();
          jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              res
      .cookie("token", token, {
                  maxAge: 90000000,
                  httpOnly: true,
                  sameSite:
                    process.env.NODE_ENV === "production" ? "None" : "Lax",
                  secure: process.env.NODE_ENV === "production",
                })

                .json({ _id: user._id, isAdmin: user.isAdmin });
            }
          );
          console.log("token created");
        } else {
          res.status(401).json("wrong password");
        }
      }
    } else {
      const user = await userModel.findOne({ email });
      if (user) {
        console.log("user found");
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          console.log("password correct");
          jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              res
                .cookie("token", token, {
                  maxAge: 90000000,
                  httpOnly: true,
                  sameSite:
                    process.env.NODE_ENV === "production" ? "None" : "Lax",
                  secure: process.env.NODE_ENV === "production",
                })
                .json({ _id: user._id, isAdmin: user.isAdmin });
            }
          );
          console.log("token created");
        } else {
          res.status(401).json("wrong password");
        }
      }
    }
  } catch (error) {

    console.error(error.message);
    res.status(401).json(error.message);

  }
};

export const postSignoutUser = async (req, res) => {
  res.clearCookie("token", {
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.send("signout user");
};

export const getValidateUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const tokenData = jwt.verify(token, jwtSecret);
    const user = await userModel.findById(tokenData.id);
    if (!user) throw new Error("User not found");

    const { _id, username, email, movies, image, isAdmin } = user;
    res.status(200).json({ _id, username, email, movies, image, isAdmin });
    console.log("Token verified");
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Error: Invalid token");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({ isAdmin: false });
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const usersInfo = allUsers.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      movies: user.movies,
      image: user.image,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    }));

    res.status(200).json(usersInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { adminId, userId } = await req.params;
  console.log("adminId", adminId);
  console.log("userId", userId);
  try {
    const admin = await userModel.findById(adminId);
    if (admin.isAdmin === true) {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        res.status(404).send("user not fund");
      } else {
        res.status(200).json(deletedUser);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
