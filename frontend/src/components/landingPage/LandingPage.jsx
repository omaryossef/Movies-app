import { useState, useContext } from "react";
import "./register.scss";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import bg_logo from "../../assets/Mask group.png";
const LandingPage = () => {
  const { user, setUser, admin, setAdmin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log("Data", data);
      if (!data) throw new Error();
      if (data && data?.isAdmin === true) {
        setAdmin(true);
      }
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log("Login failed", error);
      alert("Login failed");
    }
  }
  console.log("user", user);
  if (redirect) {
    return <Navigate to={"/home"} />;
  } else {
    <Navigate to={"/"} />;
  }
  return (
    <div
      className="register"
      style={{
        background: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    ), url(${bg_logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        position: "fixed",
      }}
    >
      <div className="header">
        <div className="opacity-layer"></div>
        <div className="wrapper">
          <div className="logo div-logo">
            <img className="img-1" src="./assets/movie-logo.png" alt="" />
            <img
              className="img-2"
              src="./assets/logo-no-background.svg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <h2>
            Don't have an account please{" "}
            {/* <a onClick={() => navigate("/register")}>Regitser</a> */}
            <a
              href="/register"
              className=" hover:text-blue-500 transition-colors 	text-decoration: underline"
              style={{
                color: "#f89e00",
              }}
            >
              Sign up
            </a>
          </h2>
        </div>
        {!hasEmail ? (
          <div className="input">
            <input
              className="passwordInput"
              type="email"
              name="email"
              placeholder="Enter Your Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //   ref={emailRef}
            />
            <button
              className="registerButton"
              onClick={() => setHasEmail(true)}
            >
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              className="passwordInput"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   ref={passwordRef}
            />
            <button className="registerButton" onClick={handleLogin}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
