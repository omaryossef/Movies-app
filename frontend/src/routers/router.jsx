import { createBrowserRouter } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/SidebarWithBurgerMenu.jsx";
import NowPlayingMovies from "../pages/movies/NowPlayingMovies.jsx";
import PopularMovies from "../pages/movies/PopularMovies.jsx";
import TopRatedMovies from "../pages/movies/TopRatedMovies.jsx";
import UpcomingMovies from "../pages/movies/UpcomingMovies.jsx";
import AiringTodaySeries from "../pages/series/AiringTodaySeries.jsx";
import OnTvSeries from "../pages/series/OnTvSeries.jsx";
import PopularSeries from "../pages/series/PopularSeries.jsx";
import TopRatedSeries from "../pages/series/TopRatedSeries.jsx";

import MovieInfo from "../pages/movies/MovieInfo";
import SeriesInfo from "../pages/series/SeriesInfo";

import HomePage from "../pages/HomePage.jsx";
import MoviesPage from "../pages/MoviesPage.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

import SettingsPage from "../pages/SettingsPage.jsx";

import RegisterPage from "../components/login/RegisterPage.jsx";
import LandingPage from "../components/landingPage/LandingPage.jsx";
import CommunityPage from "../pages/CommunityPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  { path: "/", element: <LandingPage /> },

  {
    path: "/",
    element: <SidebarWithBurgerMenu />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/community-page",
        element: <CommunityPage />,
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/now-playing-movies",
        element: <NowPlayingMovies />,
      },
      {
        path: "/Popular-movies",
        element: <PopularMovies />,
      },

      {
        path: "/top-rated-movies",
        element: <TopRatedMovies />,
      },
      {
        path: "/upcoming-movies",
        element: <UpcomingMovies />,
      },
      {
        path: "/Airing-today",
        element: <AiringTodaySeries />,
      },
      {
        path: "/on-tv-series",
        element: <OnTvSeries />,
      },
      {
        path: "/Popular-series",
        element: <PopularSeries />,
      },
      {
        path: "/top-rated-series",
        element: <TopRatedSeries />,
      },
      {
        path: "/:mediaType/:id",
        element: <MovieInfo />,
      },
      // {
      //   path: "/movies-info/:id",
      //   element: <MovieInfo />,
      // },
      {
        path: "/series-info/:id",
        element: <SeriesInfo />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/admin-page",
        element: <AdminPage />,
      },
    ],
  },
]);

export default router;
