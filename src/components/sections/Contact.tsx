import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

const formSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  discord: z.string().min(3, 'Discord tag is required'),
  message: z.string().min(10, 'Message is too short'),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'contact' | 'join'>('contact');
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log(activeTab, data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-4 tracking-tighter">
            {t('contact.title')}
          </h2>
          <div className="h-1 w-20 bg-white mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          <Card className="border-zinc-800">
            <div className="flex border-b border-zinc-800">
              <button
                className={`flex-1 py-6 text-center font-bold uppercase tracking-[0.3em] text-xs transition-all ${activeTab === 'contact' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                onClick={() => setActiveTab('contact')}
              >
                {t('contact.tabs.contact')}
              </button>
              <button
                className={`flex-1 py-6 text-center font-bold uppercase tracking-[0.3em] text-xs transition-all ${activeTab === 'join' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                onClick={() => setActiveTab('join')}
              >
                {t('contact.tabs.join')}
              </button>
            </div>

            <CardContent className="p-10">
              {submitted ? (
                <div className="text-center py-20 text-white font-mono text-xl tracking-widest uppercase animate-pulse">
                  {t('contact.form.success')}
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t('contact.form.name')}</label>
                      <input
                        {...register('name')}
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-all font-sans placeholder:text-zinc-800"
                        placeholder="TRACER"
                      />
                      {errors.name && <p className="text-white text-[10px] mt-1 font-mono uppercase italic">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t('contact.form.email')}</label>
                      <input
                        {...register('email')}
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-all font-sans placeholder:text-zinc-800"
                        placeholder="CHEERS@CAVALRY.HERE"
                      />
                      {errors.email && <p className="text-white text-[10px] mt-1 font-mono uppercase italic">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t('contact.form.discord')}</label>
                    <input
                      {...register('discord')}
                      className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-all font-sans placeholder:text-zinc-800"
                      placeholder="TRACER#1234"
                    />
                    {errors.discord && <p className="text-white text-[10px] mt-1 font-mono uppercase italic">{errors.discord.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t('contact.form.message')}</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-all font-sans resize-none placeholder:text-zinc-800"
                      placeholder={activeTab === 'join' ? t('contact.form.placeholderJoin') : t('contact.form.placeholderHelp')}
                    />
                    {errors.message && <p className="text-white text-[10px] mt-1 font-mono uppercase italic">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" className="w-full mt-10">
                    {t('contact.form.submit')}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}