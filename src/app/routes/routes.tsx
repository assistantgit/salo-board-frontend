import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@pages/home-page";
import { LoginPage } from "@pages/login-page";
import { RegisterPage } from "@pages/register-page";
import { TournamentPage } from "@pages/tournament-page";
import { LeaderboardPage } from "@pages/leaderboard-page";
import { NotFoundPage } from "@pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/tournaments/:id",
    children: [
      {
        index: true,
        element: <TournamentPage />,
      },
      {
        path: "leaderboard",
        element: <LeaderboardPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);