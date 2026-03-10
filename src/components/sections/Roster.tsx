import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Shield, Swords, Cross } from 'lucide-react';
import { useOverwatchPlayer } from '../../hooks/useOverwatchStats';

const players = [
  { name: 'Nepthys6000', battletag: 'Nepthys-6000', role: 'Support' },
  { name: 'Shika', battletag: 'Shika-1234', role: 'Tank' },
  { name: 'Gurkenpapst', battletag: 'Gurkenpapst-2468', role: 'DPS' },
  { name: 'Launchy', battletag: 'Launchy-1111', role: 'Flex' },
];

function PlayerCard({ player, idx }: { player: typeof players[0], idx: number }) {
  const { t } = useTranslation();
  const { data: stats, isLoading } = useOverwatchPlayer(player.battletag);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Tank': return <Shield className="w-5 h-5 text-zinc-400" />;
      case 'DPS': return <Swords className="w-5 h-5 text-zinc-400" />;
      case 'Support': return <Cross className="w-5 h-5 text-zinc-400" />;
      default: return <Shield className="w-5 h-5 text-zinc-400" />;
    }
  };

  // Get top heroes based on playtime from stats
  const topHeroes = stats?.heroes ? Object.entries(stats.heroes)
    .sort(([, a], [, b]) => b.playtime - a.playtime)
    .slice(0, 3) : [];

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8 }}
    >
      <Card className="group border-none bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-500 overflow-hidden relative">
        {isLoading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-20">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
        )}
        
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-12">
            <div className="p-2 border border-zinc-800 group-hover:border-white transition-colors duration-500">
              {getRoleIcon(player.role)}
            </div>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{player.role}</span>
          </div>
          
          <h3 className="text-3xl font-black font-sans italic uppercase mb-2 tracking-tighter group-hover:text-white transition-colors">
            {player.name}
          </h3>
          <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest mb-8">{player.battletag}</p>
          
          <div className="space-y-4">
            <h4 className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-2 border-b border-zinc-800 pb-2">{t('roster.topHeroes', 'Top Heroes')}</h4>
            <div className="flex gap-2">
                {topHeroes.length > 0 ? topHeroes.map(([heroName]) => (
                    <div key={heroName} className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-zinc-800 rounded-sm border border-zinc-700 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                             <img 
                                src={`https://d15f34w2p8l1cc.cloudfront.net/overwatch/f4602f30691e84323c2a38a7c2c019d67d2f976f625076f625076f625076f62.png`} 
                                alt={heroName}
                                className="w-full h-full object-cover scale-150"
                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/40'; }}
                             />
                        </div>
                        <span className="text-[8px] font-mono uppercase text-zinc-600 mt-1">{heroName}</span>
                    </div>
                )) : (
                    <div className="text-[8px] font-mono text-zinc-700 uppercase italic py-2">{t('roster.privateProfile', 'Profile Private / No Data')}</div>
                )}
            </div>
          </div>
          
          {stats?.general?.avatar && (
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <img src={stats.general.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Roster() {
  const { t } = useTranslation();

  return (
    <section className="py-24" id="team">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-4 tracking-tighter">
            {t('roster.title')}
          </h2>
          <div className="h-1 w-20 bg-white mx-auto" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map((player, idx) => (
            <PlayerCard key={player.name} player={player} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}