import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import gameplayGif from '../../assets/title_bg.gif';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 bg-black perspective-1000">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Large Tilted Gameplay Screen Background */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1, rotateY: -15, rotateX: 5 }}
        animate={{ opacity: 0.4, scale: 1.2, rotateY: -20, rotateX: 8 }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ perspective: "2000px" }}
      >
        <div className="w-full h-full bg-zinc-950">
          <img 
            src={gameplayGif} 
            alt="Gameplay Background"
            className="w-full h-full object-cover grayscale-[30%] brightness-75"
          />
          {/* Subtle Screen Overlay to blend with black background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center relative">
        <div className="relative mb-12">
          {/* Animated Background Text for Title */}
          <motion.h1 
            className="text-5xl md:text-8xl font-sans font-black uppercase italic tracking-tighter text-white leading-none relative z-10 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            FISCHMARKT FIGHTERS
          </motion.h1>
        </div>

        <motion.p 
          className="text-lg md:text-2xl font-mono text-zinc-500 mb-12 uppercase tracking-widest font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <a href="https://www.faceit.com/en/club/3fa33429-21c6-4b87-82ee-b606461aceb9" target="_blank" rel="noreferrer">
            <Button size="lg" className="w-full sm:w-auto min-w-[220px]">
              {t('hero.watchFaceit')}
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[220px]">
              {t('hero.joinUs')}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}