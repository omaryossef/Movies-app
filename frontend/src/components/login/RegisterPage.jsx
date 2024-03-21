import { useState } from "react";
import "./login.scss"; // Corrected import path
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Password must have at least 8 characters, one uppercase, one lowercase, and one number
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  async function handleRegister(e) {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      validatePassword(password)
    ) {
      try {
        await axios.post(`/register`, { username, email, password });
        setLogin(true);
        alert("Account created successfully, please ");
        navigate("/");
      } catch (error) {
        console.error("Error registering", error);
      }
    }
  }

  return (
    <div className="login">
      <div className="header">
        <div className="div-logo">
          <img className="img-1" src="./assets/movie-logo.png" alt="" />
          <img className="img-2" src="./assets/logo-no-background.svg" alt="" />
        </div>
      </div>
      <div className="container">
        <div className="background-img">
          <img src="./assets/BG-L.png" alt="" />
        </div>
        <form className="login-form">
          <input
            type="text"
            name="name"
            placeholder="Please Enter your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Please Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className={`password-input ${
              password && !validatePassword(password) ? "invalid" : ""
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                color: password && !validatePassword(password) ? "red" : "blue",
              }}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </span>
          </div>
          <Typography
            variant="small"
            color="white"
            className="mt-2 flex items-center gap-1 font-bold text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Use at least 8 characters, one uppercase, one lowercase and one
            number.
          </Typography>
          <button className="loginButton" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
