import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { SeriesProvider } from "./context/SeriesContext.jsx";
import { UploadContextProvider } from "./context/UploadContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <UploadContextProvider>
        <SeriesProvider>
          <MoviesProvider>
            <App />
          </MoviesProvider>
        </SeriesProvider>
      </UploadContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
