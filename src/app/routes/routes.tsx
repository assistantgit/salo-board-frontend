import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@pages/home-page";
import { LoginPage } from "@pages/login-page";
import { RegisterPage } from "@pages/register-page";
import { TournamentPage } from "@pages/tournament-page";
import { LeaderboardPage } from "@pages/leaderboard-page";
import { NotFoundPage } from "@pages/not-found-page";
import { UserProfilePage } from "@pages/user-profile";
import { ArchivedTournamentsPage } from "@pages/archived-tournaments";
import { NotificationsPage } from "@pages/notifications-page";
import { TournamentDetailsLayout } from "@pages/tournament-details-layout";
import { TournamentDetailsOverviewPage } from "@pages/tournament-details-overview-page";
import { TournamentRoundDetailsPage } from "@pages/tournament-round-details-page";
import { PrivateRoute } from "./PrivateRoute";

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
    path: "/profile",
    element: (
      <PrivateRoute>
        <UserProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <PrivateRoute>
        <NotificationsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/tournaments/archive",
    element: <ArchivedTournamentsPage />,
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
      {
        path: "tournamentDetails",
        element: <TournamentDetailsLayout />,
        children: [
          {
            path: "overview",
            element: <TournamentDetailsOverviewPage />,
          },
          {
            path: ":roundId",
            element: <TournamentRoundDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);