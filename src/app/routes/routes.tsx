import { AdminJudgesPage } from '@pages/admin-judges';
import { AdminOverviewPage } from '@pages/admin-overview';
import { AdminSubmissionsPage } from '@pages/admin-submissions';
import { AdminTeamsPage } from '@pages/admin-teams';
import { AdminTournamentsPage } from '@pages/admin-tournaments';
import { ArchivedTournamentsPage } from '@pages/archived-tournaments';
import { HomePage } from '@pages/home-page';
import { JurySubmissionsPage } from '@pages/jury-submissions';
import { JuryTournamentsPage } from '@pages/jury-tournaments';
import { LeaderboardPage } from '@pages/leaderboard-page';
import { LoginPage } from '@pages/login-page';
import { NotFoundPage } from '@pages/not-found-page';
import { NotificationsPage } from '@pages/notifications-page';
import { RegisterPage } from '@pages/register-page';
import { TournamentDetailsLayout } from '@pages/tournament-details-layout';
import { TournamentDetailsOverviewPage } from '@pages/tournament-details-overview-page';
import { TournamentPage } from '@pages/tournament-page';
import { TournamentRoundDetailsPage } from '@pages/tournament-round-details-page';
import { TournamentRoundSubmitPage } from '@pages/tournament-round-submit-page';
import { UserHistoryPage } from '@pages/user-history-page';
import { UserProfilePage } from '@pages/user-profile';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <UserProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile/history',
    element: (
      <PrivateRoute>
        <UserHistoryPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <PrivateRoute>
        <NotificationsPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/tournaments/archive',
    element: <ArchivedTournamentsPage />,
  },
  {
    path: '/tournaments/:id',
    children: [
      {
        index: true,
        element: <TournamentPage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: 'tournamentDetails',
        element: <TournamentDetailsLayout />,
        children: [
          {
            path: 'overview',
            element: <TournamentDetailsOverviewPage />,
          },
          {
            path: ':roundId',
            element: <TournamentRoundDetailsPage />,
          },
          {
            path: ':roundId/submit',
            element: (
              <PrivateRoute>
                <TournamentRoundSubmitPage />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'overview',
        element: (
          <PrivateRoute>
            <AdminOverviewPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'tournaments',
        element: (
          <PrivateRoute>
            <AdminTournamentsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'teams',
        element: (
          <PrivateRoute>
            <AdminTeamsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'judges',
        element: (
          <PrivateRoute>
            <AdminJudgesPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'submissions',
        element: (
          <PrivateRoute>
            <AdminSubmissionsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/jury',
    children: [
      {
        path: 'tournaments',
        element: (
          <PrivateRoute>
            <JuryTournamentsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'submissions',
        element: (
          <PrivateRoute>
            <JurySubmissionsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
