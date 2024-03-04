import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { MoviesProvider } from "./context/MoviesContext.jsx";

import { UserContextProvider } from "./context/UserContext.jsx";

import { SeriesProvider } from "./context/SeriesContext.jsx";
import { Provider } from "react-redux";
import { store } from "./sort/sort.js";
// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      {" "}
      <SeriesProvider>
        <MoviesProvider>
          <Provider store={store}>
            {/* <ThemeProvider></ThemeProvider> */}
            <App />
          </Provider>
        </MoviesProvider>
      </SeriesProvider>
    </UserContextProvider>
  </React.StrictMode>
);
