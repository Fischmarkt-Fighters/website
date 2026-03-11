import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Shield, Swords, Cross, Loader2, Crown, Zap, Target, Trophy, BarChart3, Play, ChevronDown } from 'lucide-react';
import { useTeamRoster } from '../../hooks/useFaceitClub';
import type { Player } from '../../hooks/useFaceitClub';

type StatsMode = 'competitive_season' | 'quickplay_lifetime';

function PlayerCard({ player, idx, mode }: { player: Player, idx: number, mode: StatsMode }) {
  const { t } = useTranslation();
  const stats = player.stats[mode] || player.stats['competitive_season']; // Fallback

  const getRoleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('tank')) return <Shield className="w-4 h-4" />;
    if (r.includes('dps') || r.includes('damage')) return <Swords className="w-4 h-4" />;
    if (r.includes('support') || r.includes('heal')) return <Cross className="w-4 h-4" />;
    if (r.includes('coach')) return <Target className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  const rank = player.bestRank;
  const winrate = stats?.winrate || 0;
  const endorsement = player.endorsement?.level || 1;
  const gamesWon = stats?.gamesWon || 0;
  const gamesPlayed = stats?.gamesPlayed || 0;
  const kda = stats?.kda || '0.00';
  
  const topHeroes = stats?.topHeroes ? Object.entries(stats.topHeroes)
    .sort(([, a]: any, [, b]: any) => b.playtime - a.playtime)
    .slice(0, 3) : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8 }}
      className="relative group h-full"
    >
      <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-zinc-800 group-hover:border-white transition-all duration-500 rounded-tl-2xl z-20 pointer-events-none" />
      <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-zinc-800 group-hover:border-white transition-all duration-500 rounded-br-2xl z-20 pointer-events-none" />

      <Card className="border border-white/5 bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px] h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <CardContent className="p-0 relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 pb-4 flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="relative shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 border-white/10 group-hover:border-white/30 overflow-hidden bg-black transition-all duration-500 shadow-xl">
                        {player.avatar ? (
                            <img src={player.avatar} alt={player.nickname} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700 font-black text-xl sm:text-2xl italic uppercase">
                                {player.nickname.substring(0, 2)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black font-sans italic uppercase tracking-tighter text-white leading-none truncate pr-1">
                            {player.nickname}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0">
                            {player.isLeader && <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500/20" />}
                            <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 bg-white/5 text-[8px] sm:text-[10px] font-mono font-bold text-zinc-400 group-hover:text-white group-hover:border-white/40 transition-all shadow-inner" title="Endorsement Level">
                                {endorsement}
                            </div>
                        </div>
                    </div>
                    {/* Custom Roles Badges */}
                    {player.roles && player.roles.length > 0 && (
                        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                            {player.roles.map(r => (
                                <div key={r} className="flex items-center gap-1 bg-black/40 border border-white/5 rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-sm">
                                    <span className="text-zinc-400 scale-[0.6] sm:scale-75 origin-left">{getRoleIcon(r)}</span>
                                    <span className="text-[7px] sm:text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest leading-none mt-px">{r}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Rank Icon */}
            {rank?.rank_icon ? (
                <div className="relative shrink-0 flex flex-col items-center">
                    <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Best Rank (Season)</span>
                    <img src={rank.rank_icon} alt="rank" className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-white group-hover:scale-110 transition-transform duration-500" />
                    <div className="mt-1 bg-white/10 backdrop-blur-md border border-white/20 px-1 sm:px-1.5 rounded-full text-[7px] sm:text-[8px] font-mono font-bold text-white uppercase whitespace-nowrap">
                        {rank.division} {rank.tier}
                    </div>
                </div>
            ) : (
                <div className="relative shrink-0 w-10 h-10 sm:w-14 sm:h-14 flex flex-col items-center justify-center">
                    <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold whitespace-nowrap">Best Rank (Season)</span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-600 uppercase italic mt-1">Unranked</span>
                </div>
            )}
          </div>

          <div className="px-6 text-center">
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em] block border-y border-zinc-800/50 py-1">
                {mode === 'competitive_season' ? 'Season Statistics' : 'Lifetime Statistics'}
              </span>
          </div>

          {/* 2x2 Stats Grid */}
          <div className="px-6 py-4 grid grid-cols-2 gap-3 flex-1">
              <div className="bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                      <Target className="w-3 h-3 text-zinc-500" />
                      <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Winrate</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-lg font-black font-sans italic text-white">{(winrate * 100).toFixed(0)}%</span>
                      <div className="w-8 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-white transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: `${winrate * 100}%` }} />
                      </div>
                  </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-3 h-3 text-zinc-500" />
                      <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest">KDA Ratio</span>
                  </div>
                  <span className="text-lg font-black font-sans italic text-white leading-none">{kda}</span>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-3 h-3 text-zinc-500" />
                      <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Total Wins</span>
                  </div>
                  <span className="text-lg font-black font-sans italic text-white leading-none">{gamesWon}</span>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                      <Play className="w-3 h-3 text-zinc-500" />
                      <span className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Matches</span>
                  </div>
                  <span className="text-lg font-black font-sans italic text-white leading-none">{gamesPlayed}</span>
              </div>
          </div>

          {/* Heroes Area */}
          <div className="px-8 pb-8 mt-auto">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] flex-1 bg-zinc-800" />
                <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] whitespace-nowrap">Main Selection</h4>
                <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            
            <div className="flex justify-center gap-4">
                {topHeroes.length > 0 ? topHeroes.map(([heroName, heroData]: any) => (
                    <div key={heroName} className="flex flex-col items-center group/hero">
                        <div className="w-14 h-14 bg-zinc-950 rounded-2xl border border-white/5 group-hover:border-white/20 flex items-center justify-center overflow-hidden transition-all duration-500 relative shadow-inner">
                             {heroData.icon ? (
                                 <img src={heroData.icon} alt={heroName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-[12px] font-black text-white/20 group-hover/hero:text-white transition-colors bg-zinc-900 z-0 uppercase">
                                    {heroName.substring(0, 2)}
                                </div>
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        </div>
                        <span className="text-[8px] font-mono uppercase text-zinc-600 mt-2 tracking-widest group-hover/hero:text-white transition-colors truncate max-w-[60px] text-center">{heroName}</span>
                    </div>
                )) : (
                    <div className="text-[10px] font-mono text-zinc-700 uppercase italic py-4 tracking-[0.2em]">{t('roster.privateProfile')}</div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Roster() {
  const { t } = useTranslation();
  const { data: teamMembers, isLoading } = useTeamRoster();
  const [statsMode, setStatsMode] = useState<StatsMode>('competitive_season');

  const rolesToRender = [
    { id: 'tank', label: 'Tank', icon: <Shield className="w-6 h-6" /> },
    { id: 'damage', label: 'Damage', icon: <Swords className="w-6 h-6" /> },
    { id: 'support', label: 'Support', icon: <Cross className="w-6 h-6" /> },
    { id: 'flex', label: 'Flex', icon: <Zap className="w-6 h-6" /> },
    { id: 'coach', label: 'Coach', icon: <Target className="w-6 h-6" /> }
  ];

  const getPlayersByRole = (roleId: string) => {
      if (!teamMembers) return [];
      return teamMembers.filter(p => {
          const roles = p.roles.map(r => r.toLowerCase());
          if (roleId === 'damage') return roles.includes('damage') || roles.includes('dps');
          if (roleId === 'support') return roles.includes('support') || roles.includes('heal');
          return roles.includes(roleId);
      });
  };

  return (
    <section id="team" className="py-24 border-t border-zinc-900 bg-black relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-sans font-black uppercase italic mb-4 tracking-tighter">
            {t('roster.title')}
          </h2>
          <div className="h-1 w-20 bg-white mx-auto mb-12" />

          {/* Stats Mode Switcher */}
          <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">{t('roster.statsMode.label')}</span>
              <div className="relative group">
                  <select 
                    value={statsMode}
                    onChange={(e) => setStatsMode(e.target.value as StatsMode)}
                    className="appearance-none bg-zinc-900 border border-white/10 text-white px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-wider cursor-pointer hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 pr-10"
                  >
                      <option value="competitive_season">{t('roster.statsMode.competitive_season')}</option>
                      <option value="quickplay_lifetime">{t('roster.statsMode.quickplay_lifetime')}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" />
              </div>
          </div>
        </motion.div>
        
        {isLoading ? (
            <div className="flex justify-center py-32">
                <Loader2 className="w-12 h-12 animate-spin text-zinc-800" />
            </div>
        ) : (
            <div className="space-y-24 max-w-[1400px] mx-auto">
                {rolesToRender.map(role => {
                    const players = getPlayersByRole(role.id);
                    if (players.length === 0) return null;
                    
                    return (
                        <div key={role.id}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-white shadow-lg">
                                    {role.icon}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black font-sans italic uppercase tracking-tighter text-white">{role.label}</h3>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent ml-4" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                <AnimatePresence mode="popLayout">
                                    {players.map((player, idx) => (
                                        <PlayerCard key={`${role.id}-${player.nickname}`} player={player} idx={idx} mode={statsMode} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </section>
  );
}
