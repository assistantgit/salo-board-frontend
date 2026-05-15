import { createBrowserRouter, Outlet } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { HomePage } = await import('@pages/home-page');
      return { Component: HomePage };
    },
  },
  {
    path: '/login',
    lazy: async () => {
      const { LoginPage } = await import('@pages/login-page');
      return { Component: LoginPage };
    },
  },
  {
    path: '/register',
    lazy: async () => {
      const { RegisterPage } = await import('@pages/register-page');
      return { Component: RegisterPage };
    },
  },
  {
    path: '/tournaments/archive',
    lazy: async () => {
      const { ArchivedTournamentsPage } = await import('@pages/archived-tournaments');
      return { Component: ArchivedTournamentsPage };
    },
  },
  {
    path: '/teams/archive',
    lazy: async () => {
      const { ArchivedTeamsPage } = await import('@pages/archived-teams');
      return { Component: ArchivedTeamsPage };
    },
  },
  {
    path: '/tournaments/:id',
    children: [
      {
        index: true,
        lazy: async () => {
          const { TournamentPage } = await import('@pages/tournament-page');
          return { Component: TournamentPage };
        },
      },
      {
        path: 'leaderboard',
        lazy: async () => {
          const { LeaderboardPage } = await import('@pages/leaderboard-page');
          return { Component: LeaderboardPage };
        },
      },
      {
        path: 'tournamentDetails',
        lazy: async () => {
          const { TournamentDetailsLayout } = await import('@pages/tournament-details-layout');
          return { Component: TournamentDetailsLayout };
        },
        children: [
          {
            path: 'overview',
            lazy: async () => {
              const { TournamentDetailsOverviewPage } = await import(
                '@pages/tournament-details-overview-page'
              );
              return { Component: TournamentDetailsOverviewPage };
            },
          },
          {
            path: ':roundId',
            lazy: async () => {
              const { TournamentRoundDetailsPage } = await import(
                '@pages/tournament-round-details-page'
              );
              return { Component: TournamentRoundDetailsPage };
            },
          },
          {
            element: (
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            ),
            children: [
              {
                path: ':roundId/submit',
                lazy: async () => {
                  const { TournamentRoundSubmitPage } = await import(
                    '@pages/tournament-round-submit-page'
                  );
                  return { Component: TournamentRoundSubmitPage };
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/profile',
        lazy: async () => {
          const { UserProfilePage } = await import('@pages/user-profile');
          return { Component: UserProfilePage };
        },
      },
      {
        path: '/profile/history',
        lazy: async () => {
          const { UserHistoryPage } = await import('@pages/user-history-page');
          return { Component: UserHistoryPage };
        },
      },
      {
        path: '/notifications',
        lazy: async () => {
          const { NotificationsPage } = await import('@pages/notifications-page');
          return { Component: NotificationsPage };
        },
      },
      {
        path: '/admin',
        children: [
          {
            path: 'overview',
            lazy: async () => {
              const { AdminOverviewPage } = await import('@pages/admin-overview');
              return { Component: AdminOverviewPage };
            },
          },
          {
            path: 'tournaments',
            children: [
              {
                index: true,
                lazy: async () => {
                  const { AdminTournamentsPage } = await import('@pages/admin-tournaments');
                  return { Component: AdminTournamentsPage };
                },
              },
              {
                path: 'create',
                lazy: async () => {
                  const { AdminTournamentEditPage } = await import('@pages/admin-tournament-edit');
                  return { Component: AdminTournamentEditPage };
                },
              },
              {
                path: ':id/edit',
                lazy: async () => {
                  const { AdminTournamentEditPage } = await import('@pages/admin-tournament-edit');
                  return { Component: AdminTournamentEditPage };
                },
              },
            ],
          },
          {
            path: 'teams',
            lazy: async () => {
              const { AdminTeamsPage } = await import('@pages/admin-teams');
              return { Component: AdminTeamsPage };
            },
          },
          {
            path: 'evaluation',
            lazy: async () => {
              const { AdminEvaluationsPage } = await import('@pages/admin-evaluation');
              return { Component: AdminEvaluationsPage };
            },
          },
          {
            path: 'submissions',
            children: [
              {
                index: true,
                lazy: async () => {
                  const { AdminSubmissionsPage } = await import('@pages/admin-submissions');
                  return { Component: AdminSubmissionsPage };
                },
              },
              {
                path: ':tournamentId/:roundId/:submissionId',
                lazy: async () => {
                  const { AdminSubmissionDetailsPage } = await import(
                    '@pages/admin-submission-details'
                  );
                  return { Component: AdminSubmissionDetailsPage };
                },
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
            lazy: async () => {
              const { JuryTournamentsPage } = await import('@pages/jury-tournaments');
              return { Component: JuryTournamentsPage };
            },
          },
          {
            path: 'submissions',
            children: [
              {
                index: true,
                lazy: async () => {
                  const { JurySubmissionsPage } = await import('@pages/jury-submissions');
                  return { Component: JurySubmissionsPage };
                },
              },
              {
                path: ':tournamentId/:roundId/:submissionId',
                lazy: async () => {
                  const { EvaluateSubmissionPage } = await import('@pages/evaluate-submission');
                  return { Component: EvaluateSubmissionPage };
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFoundPage } = await import('@pages/not-found-page');
      return { Component: NotFoundPage };
    },
  },
]);
