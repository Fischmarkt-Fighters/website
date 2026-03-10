import { useQuery } from '@tanstack/react-query';

export interface PlayerStats {
  general?: {
    name: string;
    avatar?: string;
    level?: number;
  };
  heroes?: Record<string, {
    winrate: number;
    playtime: number;
    kda: number;
  }>;
}

export function useOverwatchPlayer(battletag: string) {
  const playerId = battletag.replace('#', '-');
  
  return useQuery({
    queryKey: ['overwatch-player', playerId],
    queryFn: async () => {
      if (!battletag || battletag.length < 3) return null;
      
      try {
        const res = await fetch(`https://overfast-api.tekrop.fr/players/${playerId}/stats/summary?gamemode=competitive&platform=pc`);
        if (!res.ok) return null;
        return (await res.json()) as PlayerStats;
      } catch (err) {
        return null;
      }
    },
    enabled: !!battletag,
  });
}