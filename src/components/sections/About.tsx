import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-zinc-900 z-10">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 
              className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-12 tracking-tighter"
              dangerouslySetInnerHTML={{ __html: t('about.title') }}
            />
            
            <p className="text-xl md:text-2xl font-sans text-zinc-400 leading-relaxed mb-10 font-light">
              {t('about.description')}
            </p>

            <div className="flex flex-col items-center gap-4">
               <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
               <span className="text-zinc-600 font-mono uppercase tracking-[0.5em] text-xs">est. 2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}