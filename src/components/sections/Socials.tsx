import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Instagram, Twitch } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socialLinks = [
  {
    name: 'Instagram',
    icon: <Instagram className="w-8 h-8" />,
    url: 'https://instagram.com',
    color: 'group-hover:text-[#E1306C]',
    borderColor: 'group-hover:border-[#E1306C]/60',
    bgColor: 'group-hover:bg-[#E1306C]/10',
    shadow: 'group-hover:shadow-[0_0_40px_rgba(225,48,108,0.3)]'
  },
  {
    name: 'Twitch',
    icon: <Twitch className="w-8 h-8" />,
    url: 'https://twitch.tv/fischmarktfighters',
    color: 'group-hover:text-[#9146FF]',
    borderColor: 'group-hover:border-[#9146FF]/60',
    bgColor: 'group-hover:bg-[#9146FF]/10',
    shadow: 'group-hover:shadow-[0_0_40px_rgba(145,70,255,0.3)]'
  },
  {
    name: 'TikTok',
    icon: <TikTokIcon className="w-8 h-8" />,
    url: 'https://tiktok.com',
    color: 'group-hover:text-white',
    borderColor: 'group-hover:border-white/40',
    bgColor: 'group-hover:bg-white/5',
    shadow: 'group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]'
  }
];

export function Socials() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-4 tracking-tighter">
            {t('hero.followUs')}
          </h2>
          <div className="h-1 w-20 bg-white mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                // Initial entrance delay still exists, but hover transition is separate
              }}
              className={`group relative flex flex-col items-center justify-center w-44 h-44 rounded-2xl border border-zinc-900 bg-zinc-950 transition-all duration-300 ${link.borderColor} ${link.bgColor} ${link.shadow}`}
            >
              <div className={`text-zinc-600 transition-colors duration-300 scale-110 mb-4 ${link.color}`}>
                {link.icon}
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700 group-hover:text-white transition-colors duration-300">
                {link.name}
              </span>
              
              {/* Sleek Corner Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-zinc-900 group-hover:border-white transition-all duration-500" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-zinc-900 group-hover:border-white transition-all duration-500" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-zinc-900 group-hover:border-white transition-all duration-500" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-zinc-900 group-hover:border-white transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
