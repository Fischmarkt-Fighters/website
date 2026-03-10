import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTeamMatches, useLatestChampionship } from '../../hooks/useFaceitClub';
import type { Match } from '../../hooks/useFaceitClub';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Loader2, ExternalLink, Calendar, History, Trophy, XCircle, Award } from 'lucide-react';

const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';

export function Matches() {
  const { t } = useTranslation();
  const { data: allMatches, isLoading } = useTeamMatches();
  const { data: latestChamp } = useLatestChampionship();

  const upcomingMatches = allMatches?.filter(m => m.status !== 'finished').slice(0, 3) || [];
  const pastMatches = allMatches?.filter(m => m.status === 'finished').slice(0, 3) || [];

  return (
    <section className="py-24 border-t border-zinc-900 bg-black relative z-10" id="matches">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-4 tracking-tighter">
            {t('matches.title')}
          </h2>
          <div className="h-1 w-20 bg-white mx-auto" />
        </motion.div>

        {/* Latest Tournament Spotlight */}
        {latestChamp && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto mb-12"
          >
            <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                {latestChamp.cover_image && (
                  <img src={latestChamp.cover_image} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              </div>
              
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-yellow-500">{t('matches.latestTournament')}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-sans font-black uppercase italic leading-none max-w-2xl">
                    {latestChamp.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono uppercase font-bold text-zinc-400">
                      {t('matches.status', 'Status')}: {latestChamp.status}
                    </span>
                  </div>
                </div>
                
                <a href={latestChamp.faceit_url} target="_blank" rel="noreferrer" className="shrink-0">
                  <Button variant="outline" className="gap-3 group-hover:bg-white group-hover:text-black transition-colors">
                    {t('matches.tournamentDetails')} <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Form Indicator */}
        {!isLoading && pastMatches.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center mb-20 space-y-4"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-500">{t('matches.teamForm')}</span>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
              {allMatches?.filter(m => m.status === 'finished').slice(0, 10).map((m, i) => {
                const faction1 = m.teams?.faction1;
                const faction2 = m.teams?.faction2;
                if (!faction1 || !faction2) return null;

                const isFaction1OurTeam = faction1.team_id === TEAM_ID;
                const ourFactionKey = isFaction1OurTeam ? 'faction1' : 'faction2';
                const winner = m.results?.winner;
                const win = winner === m.teams[ourFactionKey]?.team_id || winner === ourFactionKey;
                
                return (
                  <div key={m.match_id} className="group relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-sans font-black italic text-base border-b-2 transition-all ${
                        win 
                          ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                          : 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                      }`}
                    >
                      {win ? t('matches.win').charAt(0).toUpperCase() : t('matches.loss').charAt(0).toUpperCase()}
                    </motion.div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[8px] font-mono uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      {t('matches.vs')} {isFaction1OurTeam ? faction2.nickname : faction1.nickname}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Upcoming Matches */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <Calendar className="w-6 h-6 text-white" />
                <h3 className="text-xl font-sans font-black uppercase italic tracking-widest">{t('matches.upcoming')}</h3>
            </div>
            
            {isLoading ? (
               <Loader2 className="w-8 h-8 animate-spin opacity-20 mx-auto" />
            ) : upcomingMatches.length > 0 ? (
                upcomingMatches.map((match, idx) => (
                    <MatchCard key={match.match_id} match={match} idx={idx} />
                ))
            ) : (
                <div className="p-8 border border-dashed border-zinc-800 rounded-lg text-center">
                  <p className="text-zinc-600 font-mono text-xs uppercase italic">
                    {t('matches.noUpcoming')}
                  </p>
                </div>
            )}
          </div>

          {/* Past Matches */}
          <div className="space-y-8">
             <div className="flex items-center gap-4 mb-8">
                <History className="w-6 h-6 text-zinc-500" />
                <h3 className="text-xl font-sans font-black uppercase italic tracking-widest text-zinc-500">{t('matches.history')}</h3>
            </div>

            {isLoading ? (
               <Loader2 className="w-8 h-8 animate-spin opacity-20 mx-auto" />
            ) : pastMatches.length > 0 ? (
                pastMatches.map((match, idx) => (
                    <MatchCard key={match.match_id} match={match} idx={idx} isPast />
                ))
            ) : (
                <div className="p-8 border border-dashed border-zinc-800 rounded-lg text-center">
                  <p className="text-zinc-600 font-mono text-xs uppercase italic">
                    {t('matches.noPast', 'No recent match history found.')}
                  </p>
                </div>
            )}
          </div>
        </div>
          
        <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="flex justify-center mt-20"
        >
            <a 
              href="https://www.faceit.com/en/teams/6ef4eae3-bcb5-41d6-9615-d724287e5699" 
              target="_blank" 
              rel="noreferrer"
            >
              <Button variant="outline" className="flex items-center gap-3">
                {t('matches.faceitButton')} <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
        </motion.div>
      </div>
    </section>
  );
}

function MatchCard({ match, idx, isPast = false }: { match: Match, idx: number, isPast?: boolean }) {
    const { t } = useTranslation();
    if (!match || !match.teams) return null;

    const faction1 = match.teams.faction1;
    const faction2 = match.teams.faction2;
    
    if (!faction1 || !faction2) return null;

    const isFaction1OurTeam = faction1.team_id === TEAM_ID;
    const ourFactionKey = isFaction1OurTeam ? 'faction1' : 'faction2';
    const opponentFactionKey = isFaction1OurTeam ? 'faction2' : 'faction1';
    
    const ourTeam = isFaction1OurTeam ? faction1 : faction2;
    const opponent = isFaction1OurTeam ? faction2 : faction1;
    
    const winner = match.results?.winner;
    const win = isPast && (winner === ourTeam.team_id || winner === ourFactionKey);
    
    // Versuch, den detaillierten Score zu finden (2-0 statt 1-0)
    const getScore = (key: string) => {
        const results = match.results as any;
        // In manchen Fällen ist der Score tiefer in 'factions' oder 'score' Objekten
        return results?.factions?.[key]?.score ?? 
               results?.score?.[key] ?? 
               (match as any)?.score?.[key] ??
               0;
    };

    const ourScore = getScore(ourFactionKey);
    const opponentScore = getScore(opponentFactionKey);

    const faceitUrl = match.faceit_url?.replace('{lang}', 'de') || '#';

    return (
        <motion.div
            initial={{ opacity: 0, x: isPast ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
        >
            <Card className={`group relative overflow-hidden ${isPast ? 'opacity-80' : 'border-white/20'}`}>
                {isPast && (
                    <div className={`absolute top-0 left-0 w-1 h-full ${win ? 'bg-green-500' : 'bg-red-500'}`} />
                )}
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <span className="text-xs font-mono font-bold text-zinc-500 block mb-1">
                                {match.started_at ? new Date(match.started_at * 1000).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'TBD'}
                            </span>
                            <span className="text-sm font-black font-sans uppercase italic truncate block">
                                {ourTeam.nickname || 'Fischmarkt Fighters'}
                            </span>
                        </div>

                        <div className="flex flex-col items-center shrink-0 px-4">
                            {isPast ? (
                                <div className="flex flex-col items-center">
                                    <div className="text-xl font-black font-sans italic tracking-tighter flex items-center gap-2">
                                        <span className={win ? 'text-green-500' : 'text-zinc-400'}>{ourScore}</span>
                                        <span className="text-zinc-600">-</span>
                                        <span className={!win && opponentScore > ourScore ? 'text-red-500' : 'text-zinc-400'}>{opponentScore}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                        {win ? (
                                            <Trophy className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <XCircle className="w-3 h-3 text-red-500" />
                                        )}
                                        <span className={`text-[10px] font-mono font-bold uppercase ${win ? 'text-green-500' : 'text-red-500'}`}>
                                            {win ? t('matches.win') : t('matches.loss')}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className="text-xs font-mono font-bold text-zinc-600 mb-1 uppercase tracking-widest">{t('matches.vs')}</span>
                                    <div className="px-2 py-0.5 bg-zinc-900 text-[8px] font-mono border border-zinc-800 uppercase tracking-widest text-zinc-300">
                                        {match.status || 'UPCOMING'}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 text-right">
                            <span className="text-xs font-mono font-bold text-zinc-500 block mb-1">
                                {match.started_at ? new Date(match.started_at * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                            <span className="text-sm font-black font-sans uppercase italic truncate block text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                {opponent.nickname || 'TBD'}
                            </span>
                        </div>
                    </div>
                    
                    {match.faceit_url && (
                        <a 
                            href={faceitUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ExternalLink className="w-3 h-3 text-zinc-500 hover:text-white" />
                        </a>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}