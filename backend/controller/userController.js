import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const jwtSecret = "movie";

export const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);

  try {
    const user = await userModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(user);
    console.log("registration successful");
  } catch (error) {
    console.error(error);
    res.status(422).json(error);
  }
};

export const postLoginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    if (!email && !password) throw new Error("Please enter a valid email");
    const user = await userModel.findOne({ email });
    if (user) {
      console.log("user found");

      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        console.log("password correct");
        jwt.sign({ id: user._id }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        });
        console.log("token created");
      } else {
        res.status(401).json("wrong password");
      }
    }
  } catch (error) {
    res.status(401).json("user not found");
  }
};

export const postSignoutUser = async (req, res) => {
  res.clearCookie("token");
  res.send("signout user");
};

export const getValidateUser = async (req, res) => {
  const { token } = await req.cookies;
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      const user = await userModel.findById(tokenData.id);
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(400).json("error invalid token");
  }
};
