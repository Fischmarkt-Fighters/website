import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001/api/faceit' : '/api/faceit';

export interface Player {
  nickname: string;
  avatar?: string;
  battletag?: string;
  roles: string[];
  isLeader?: boolean;
  bestRank?: {
    division: string;
    tier: string;
    rank_icon: string;
  };
  endorsement?: {
    level: number;
    frame: string;
  };
  stats: {
    competitive_season: {
        winrate: number;
        gamesWon: number;
        gamesPlayed: number;
        kda: string;
        topHeroes: any;
    } | null;
    quickplay_lifetime: {
        winrate: number;
        gamesWon: number;
        gamesPlayed: number;
        kda: string;
        topHeroes: any;
    } | null;
  };
}

export interface Match {
  match_id: string;
  game_id: string;
  status: string;
  started_at?: number;
  faceit_url: string;
  competition_id?: string;
  competition_type?: string;
  competition_name?: string;
  results?: {
    winner: string;
    score: Record<string, number>;
  };
  teams: {
    faction1: { team_id: string; nickname: string; avatar: string };
    faction2: { team_id: string; nickname: string; avatar: string };
  };
}

export interface Championship {
  id: string;
  name: string;
  status: string;
  faceit_url: string;
  cover_image: string;
}

export function useTeamMatches() {
  return useQuery({
    queryKey: ['team-matches'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/matches`);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.matches || []) as Match[];
    },
    staleTime: 1000 * 30,
  });
}

export function useLatestChampionship() {
  return useQuery({
    queryKey: ['latest-championship'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/latest-championship`);
      if (!res.ok) return null;
      return await res.json() as Championship;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useTeamRoster() {
  return useQuery({
    queryKey: ['team-roster'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/roster`);
      if (!res.ok) return [];
      return (await res.json()) as Player[];
    },
    staleTime: 1000 * 60,
  });
}
