import type { TournamentStatus } from '../../../entities/tournament/model/tournament.types';

export interface CtaConfig {
  label: string;
  href: (id: number) => string;
}

export const CTA_CONFIG: Record<TournamentStatus, CtaConfig> = {
  FN: { label: 'Переглянути результати', href: (id) => `/tournaments/${id}/leaderboard` },
  RG: { label: 'Перейти до реєстрації',  href: (id) => `/tournaments/${id}/register` },
  RN: { label: 'Перейти до турніру',     href: (id) => `/tournaments/${id}` },
  DR: { label: 'Перейти до турніру',     href: (id) => `/tournaments/${id}` },
  AR: { label: 'Переглянути результати', href: (id) => `/tournaments/${id}/leaderboard` },
};

export const getCtaConfig = (status: TournamentStatus): CtaConfig => CTA_CONFIG[status];
