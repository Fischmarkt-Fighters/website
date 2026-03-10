import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.jpg';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 bg-black">
      {/* Background Video or Clip Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        {/* Replace the src with a real Overwatch gameplay clip or a high-quality abstract looping video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover scale-110"
        >
           <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-digital-background-with-lines-and-dots-34444-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Floating Koi Skeletons as background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-5">
         <motion.svg 
            viewBox="0 0 500 500" 
            className="absolute -left-20 top-20 w-[400px] h-[400px] fill-none stroke-white"
            animate={{ x: [-20, 20, -20], y: [0, 30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         >
             <path d="M100,250 C100,150 250,50 400,150 C450,200 450,300 400,350 C250,450 100,350 100,250 M150,250 L350,250 M200,200 L200,300 M250,180 L250,320 M300,200 L300,300" strokeWidth="1" />
         </motion.svg>
         
         <motion.svg 
            viewBox="0 0 500 500" 
            className="absolute -right-20 bottom-20 w-[500px] h-[500px] fill-none stroke-white"
            animate={{ x: [20, -20, 20], y: [0, -40, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
         >
             <path d="M100,250 C100,150 250,50 400,150 C450,200 450,300 400,350 C250,450 100,350 100,250 M150,250 L350,250 M200,200 L200,300 M250,180 L250,320 M300,200 L300,300" strokeWidth="1" />
         </motion.svg>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="relative mb-8"
        >
          <motion.img 
            src={logo} 
            alt="Fischmarkt Fighters Logo" 
            className="w-full max-w-[300px] md:max-w-[400px] h-auto object-contain grayscale brightness-125"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <div className="relative">
          {/* Animated Background Text for Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-sans font-black uppercase italic tracking-tighter mb-4 text-white leading-none relative z-10"
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