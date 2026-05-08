import type { Submission } from '@entities/submission';

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 1,
    tournamentTitle: 'NLP Challenge 2025',
    roundTitle: 'Раунд 1',
    teamName: 'DreamTeam',
    status: 'UNRATED',
    lastModified: '2025-05-01T12:00:00Z',
  },
  {
    id: 2,
    tournamentTitle: 'NLP Challenge 2025',
    roundTitle: 'Раунд 2',
    teamName: 'DreamTeam',
    status: 'DRAFT',
    lastModified: '2025-05-02T15:30:00Z',
  },
  {
    id: 3,
    tournamentTitle: 'NLP Challenge 2025',
    roundTitle: 'Раунд 3',
    teamName: 'DreamTeam',
    status: 'RATED',
    lastModified: '2025-05-05T10:00:00Z',
  },
  {
    id: 4,
    tournamentTitle: 'AI Startup Hackathon',
    roundTitle: 'Фінал',
    teamName: 'CyberSalo',
    status: 'UNRATED',
    lastModified: '2025-05-08T09:00:00Z',
  },
  {
    id: 5,
    tournamentTitle: 'NLP Challenge 2025',
    roundTitle: 'Раунд 1',
    teamName: 'AlphaBot',
    status: 'RATED',
    lastModified: '2025-04-28T14:00:00Z',
  },
  {
    id: 6,
    tournamentTitle: 'Cyber Security Cup',
    roundTitle: 'Кваліфікація',
    teamName: 'HackersUA',
    status: 'DRAFT',
    lastModified: '2025-05-07T18:00:00Z',
  },
];
