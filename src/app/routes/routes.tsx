import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

const AdminEvaluationsPage = lazy(() =>
  import('@pages/admin-evaluation').then((m) => ({ default: m.AdminEvaluationsPage })),
);
const AdminOverviewPage = lazy(() =>
  import('@pages/admin-overview').then((m) => ({ default: m.AdminOverviewPage })),
);
const AdminSubmissionDetailsPage = lazy(() =>
  import('@pages/admin-submission-details').then((m) => ({
    default: m.AdminSubmissionDetailsPage,
  })),
);
const AdminSubmissionsPage = lazy(() =>
  import('@pages/admin-submissions').then((m) => ({ default: m.AdminSubmissionsPage })),
);
const AdminTeamsPage = lazy(() =>
  import('@pages/admin-teams').then((m) => ({ default: m.AdminTeamsPage })),
);
const AdminTournamentEditPage = lazy(() =>
  import('@pages/admin-tournament-edit').then((m) => ({ default: m.AdminTournamentEditPage })),
);
const AdminTournamentsPage = lazy(() =>
  import('@pages/admin-tournaments').then((m) => ({ default: m.AdminTournamentsPage })),
);
const ArchivedTournamentsPage = lazy(() =>
  import('@pages/archived-tournaments').then((m) => ({ default: m.ArchivedTournamentsPage })),
);
const EvaluateSubmissionPage = lazy(() =>
  import('@pages/evaluate-submission').then((m) => ({ default: m.EvaluateSubmissionPage })),
);
const HomePage = lazy(() => import('@pages/home-page').then((m) => ({ default: m.HomePage })));
const JurySubmissionsPage = lazy(() =>
  import('@pages/jury-submissions').then((m) => ({ default: m.JurySubmissionsPage })),
);
const JuryTournamentsPage = lazy(() =>
  import('@pages/jury-tournaments').then((m) => ({ default: m.JuryTournamentsPage })),
);
const LeaderboardPage = lazy(() =>
  import('@pages/leaderboard-page').then((m) => ({ default: m.LeaderboardPage })),
);
const LoginPage = lazy(() => import('@pages/login-page').then((m) => ({ default: m.LoginPage })));
const NotFoundPage = lazy(() =>
  import('@pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
);
const NotificationsPage = lazy(() =>
  import('@pages/notifications-page').then((m) => ({ default: m.NotificationsPage })),
);
const RegisterPage = lazy(() =>
  import('@pages/register-page').then((m) => ({ default: m.RegisterPage })),
);
const TournamentDetailsLayout = lazy(() =>
  import('@pages/tournament-details-layout').then((m) => ({ default: m.TournamentDetailsLayout })),
);
const TournamentDetailsOverviewPage = lazy(() =>
  import('@pages/tournament-details-overview-page').then((m) => ({
    default: m.TournamentDetailsOverviewPage,
  })),
);
const TournamentPage = lazy(() =>
  import('@pages/tournament-page').then((m) => ({ default: m.TournamentPage })),
);
const TournamentRoundDetailsPage = lazy(() =>
  import('@pages/tournament-round-details-page').then((m) => ({
    default: m.TournamentRoundDetailsPage,
  })),
);
const TournamentRoundSubmitPage = lazy(() =>
  import('@pages/tournament-round-submit-page').then((m) => ({
    default: m.TournamentRoundSubmitPage,
  })),
);
const UserHistoryPage = lazy(() =>
  import('@pages/user-history-page').then((m) => ({ default: m.UserHistoryPage })),
);
const UserProfilePage = lazy(() =>
  import('@pages/user-profile').then((m) => ({ default: m.UserProfilePage })),
);

const Suspended = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className='suspense-loader' />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspended>
        <HomePage />
      </Suspended>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspended>
        <LoginPage />
      </Suspended>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspended>
        <RegisterPage />
      </Suspended>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Suspended>
          <UserProfilePage />
        </Suspended>
      </PrivateRoute>
    ),
  },
  {
    path: '/profile/history',
    element: (
      <PrivateRoute>
        <Suspended>
          <UserHistoryPage />
        </Suspended>
      </PrivateRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <PrivateRoute>
        <Suspended>
          <NotificationsPage />
        </Suspended>
      </PrivateRoute>
    ),
  },
  {
    path: '/tournaments/archive',
    element: (
      <Suspended>
        <ArchivedTournamentsPage />
      </Suspended>
    ),
  },
  {
    path: '/tournaments/:id',
    children: [
      {
        index: true,
        element: (
          <Suspended>
            <TournamentPage />
          </Suspended>
        ),
      },
      {
        path: 'leaderboard',
        element: (
          <Suspended>
            <LeaderboardPage />
          </Suspended>
        ),
      },
      {
        path: 'tournamentDetails',
        element: (
          <Suspended>
            <TournamentDetailsLayout />
          </Suspended>
        ),
        children: [
          {
            path: 'overview',
            element: (
              <Suspended>
                <TournamentDetailsOverviewPage />
              </Suspended>
            ),
          },
          {
            path: ':roundId',
            element: (
              <Suspended>
                <TournamentRoundDetailsPage />
              </Suspended>
            ),
          },
          {
            path: ':roundId/submit',
            element: (
              <PrivateRoute>
                <Suspended>
                  <TournamentRoundSubmitPage />
                </Suspended>
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
            <Suspended>
              <AdminOverviewPage />
            </Suspended>
          </PrivateRoute>
        ),
      },
      {
        path: 'tournaments',
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Suspended>
                  <AdminTournamentsPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
          {
            path: 'create',
            element: (
              <PrivateRoute>
                <Suspended>
                  <AdminTournamentEditPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PrivateRoute>
                <Suspended>
                  <AdminTournamentEditPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: 'teams',
        element: (
          <PrivateRoute>
            <Suspended>
              <AdminTeamsPage />
            </Suspended>
          </PrivateRoute>
        ),
      },
      {
        path: 'evaluation',
        element: (
          <PrivateRoute>
            <Suspended>
              <AdminEvaluationsPage />
            </Suspended>
          </PrivateRoute>
        ),
      },
      {
        path: 'submissions',
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Suspended>
                  <AdminSubmissionsPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
          {
            path: ':tournamentId/:roundId/:submissionId',
            element: (
              <PrivateRoute>
                <Suspended>
                  <AdminSubmissionDetailsPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
        ],
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
            <Suspended>
              <JuryTournamentsPage />
            </Suspended>
          </PrivateRoute>
        ),
      },
      {
        path: 'submissions',
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Suspended>
                  <JurySubmissionsPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
          {
            path: ':tournamentId/:roundId/:submissionId',
            element: (
              <PrivateRoute>
                <Suspended>
                  <EvaluateSubmissionPage />
                </Suspended>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspended>
        <NotFoundPage />
      </Suspended>
    ),
  },
]);
