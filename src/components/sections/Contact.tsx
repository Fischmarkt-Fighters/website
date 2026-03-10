import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message is too short'),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Fehler beim Senden der Nachricht.');
      }
    } catch (error) {
      console.error('Contact error:', error);
      alert('Es konnte keine Verbindung zum Server hergestellt werden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative border-t border-zinc-900 overflow-hidden" id="contact">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-sans font-black uppercase italic mb-4 tracking-tighter">
            {t('contact.title')}
          </h2>
          <div className="h-1 w-20 bg-white mx-auto mb-8" />
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Cyber Corner Accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-xl pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-xl pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-xl pointer-events-none" />

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 text-white font-mono text-xl tracking-widest uppercase border border-zinc-800 rounded-2xl bg-zinc-900/80 backdrop-blur-xl shadow-2xl"
            >
              {t('contact.form.success')}
            </motion.div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-12 bg-zinc-900/40 p-8 md:p-16 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Subtle Inner Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3 group">
                  <label className="block text-[10px] font-mono text-zinc-300 uppercase tracking-[0.4em] group-focus-within:text-white transition-colors duration-300">
                    {t('contact.form.name')}
                  </label>
                  <input
                    {...register('name')}
                    className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:outline-none focus:ring-0 focus:border-white focus:bg-white/5 px-4 -mx-4 transition-colors duration-500 font-sans placeholder:text-zinc-600 text-lg rounded-t-lg"
                    placeholder="TRACER"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-2 font-mono uppercase italic tracking-wider">{errors.name.message}</p>}
                </div>

                <div className="space-y-3 group">
                  <label className="block text-[10px] font-mono text-zinc-300 uppercase tracking-[0.4em] group-focus-within:text-white transition-colors duration-300">
                    {t('contact.form.email')}
                  </label>
                  <input
                    {...register('email')}
                    className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:outline-none focus:ring-0 focus:border-white focus:bg-white/5 px-4 -mx-4 transition-colors duration-500 font-sans placeholder:text-zinc-600 text-lg rounded-t-lg"
                    placeholder="CHEERS@CAVALRY.HERE"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-2 font-mono uppercase italic tracking-wider">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="block text-[10px] font-mono text-zinc-300 uppercase tracking-[0.4em] group-focus-within:text-white transition-colors duration-300">
                  {t('contact.form.message')}
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:outline-none focus:ring-0 focus:border-white focus:bg-white/5 px-4 -mx-4 transition-colors duration-500 font-sans resize-none placeholder:text-zinc-600 text-lg rounded-t-lg"
                  placeholder={t('contact.form.placeholderHelp')}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-500 text-[10px] mt-2 font-mono uppercase italic tracking-wider">{errors.message.message}</p>}
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="min-w-[240px] h-14 group relative overflow-hidden rounded-xl border border-white/10 hover:border-white/40 transition-all duration-500"
                >
                  <span className="relative z-10 font-black italic uppercase tracking-widest">
                    {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                  </span>
                  {!isSubmitting && (
                    <>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                      <div className="absolute inset-0 bg-white/10" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
