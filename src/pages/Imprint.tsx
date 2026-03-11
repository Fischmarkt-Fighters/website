import { useTranslation } from 'react-i18next';

export default function Imprint() {
  const { t } = useTranslation();

  const name = import.meta.env.VITE_IMPRINT_NAME || "[NAME]";
  const street = import.meta.env.VITE_IMPRINT_STREET || "[STRASSE HAUSNUMMER]";
  const city = import.meta.env.VITE_IMPRINT_CITY || "[PLZ ORT]";

  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-12 tracking-tighter">
        {t('footer.imprint')}
      </h1>
      <div className="prose prose-invert max-w-none font-sans text-zinc-400 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {t('imprint.section_ddg')}
          </h2>
          <p>
            Fischmarkt Fighters<br />
            {name}<br />
            {street}<br />
            {city}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {t('imprint.section_contact')}
          </h2>
          <p>
            E-Mail: contact@fischmarktfighters.de
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {t('imprint.section_editorial')}
          </h2>
          <p>
            {name}<br />
            {street}<br />
            {city}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {t('imprint.section_disclaimer')}
          </h2>
          <div className="space-y-4">
            <p>
              {t('imprint.disclaimer_text1')}
            </p>
            <p>
              {t('imprint.disclaimer_text2')}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {t('imprint.section_dispute')}
          </h2>
          <p>
            {t('imprint.dispute_text')}
          </p>
        </section>
      </div>
    </div>
  );
}
