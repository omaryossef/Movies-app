import { useRef, useState } from "react";
import "./login.scss"; // Corrected import path
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const backendUrl = "http://localhost:3000";

  async function handleRegister(e) {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      try {
        await axios.post(
          `${backendUrl}/register`,
          { username, email, password },
          { withCredentials: true }
        );
        setLogin(true);
        alert("Account created successfully, please ");
        navigate("/register");
      } catch (error) {
        console.log("Error registering", error);
      }
    }
  }
  return (
    <div className="login">
      <div className="header">
        <div className="wrapper">
          <div className="div-logo">
            <img className="img-1" src="src/assets/movie-logo.png" alt="" />
            <img
              className="img-2"
              src="src/assets/logo-no-background.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="background-img">
          <img src="src/assets/BG-L.png" alt="" />
        </div>
        <div className="opacity-layer"></div>
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
