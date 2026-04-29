import type { TeamDomain } from '@entities/team/model/team.types';
import type { TournamentDomain } from '@entities/tournament/model/tournament.types';

export const MOCK_TOURNAMENT: TournamentDomain = {
  id: 1,
  title: 'SaloBoard Championship 2026',
  description:
    'Великий весняний турнір з настільних ігор для професіоналів та аматорів. Призовий фонд: 10,000 грн та вічна слава у залі героїв SaloBoard.',
  rules:
    '1. Кожна команда має складатися з 3-5 гравців.\n2. Усі учасники повинні бути зареєстровані до дедлайну.\n3. Використання стороннього ПЗ для маніпуляції результатами суворо заборонено.\n4. Організатори мають право змінювати розклад у разі технічних несправностей.',
  organizer: 'SaloBoard Team',
  status: 'RG', // Registration
  startDate: new Date(2026, 4, 15),
  regOpenAt: new Date(2026, 3, 1),
  regCloseAt: new Date(2026, 4, 10),
  endedAt: new Date(2026, 4, 20),
  isTeamVisible: true,
  teamsCount: 12,
  roundsCount: 5,
  minTeamSize: 3,
  maxTeamSize: 5,
  maxTeam: 16,
};

export const MOCK_TEAMS: TeamDomain[] = [
  { id: 1, name: 'Cyber Cats', status: 'RG', tournamentId: 1, initials: 'CC' },
  { id: 2, name: 'Slow Slovers', status: 'RG', tournamentId: 1, initials: 'SS' },
  { id: 3, name: 'Pixel Panthers', status: 'RG', tournamentId: 1, initials: 'PP' },
  { id: 4, name: 'Bit Bandits', status: 'RG', tournamentId: 1, initials: 'BB' },
  { id: 5, name: 'Code Crusaders', status: 'RG', tournamentId: 1, initials: 'CC' },
  { id: 6, name: 'Logic Lions', status: 'RG', tournamentId: 1, initials: 'LL' },
  { id: 7, name: 'Data Dragons', status: 'RG', tournamentId: 1, initials: 'DD' },
  { id: 8, name: 'Algo Avengers', status: 'RG', tournamentId: 1, initials: 'AA' },
  { id: 9, name: 'Stack Stars', status: 'RG', tournamentId: 1, initials: 'SS' },
  { id: 10, name: 'Dev Devils', status: 'RG', tournamentId: 1, initials: 'DD' },
  { id: 11, name: 'Bug Busters', status: 'RG', tournamentId: 1, initials: 'BB' },
  { id: 12, name: 'Frame Force', status: 'RG', tournamentId: 1, initials: 'FF' },
];
