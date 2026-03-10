import { useQuery } from '@tanstack/react-query';

// In development we target the backend server directly, in production we use relative paths
const API_BASE = import.meta.env.DEV ? 'http://localhost:3001/api/faceit' : '/api/faceit';

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
    staleTime: 1000 * 30, // 30 seconds
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
