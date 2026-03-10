import { useTranslation } from 'react-i18next';

export default function Imprint() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

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
            {isEn ? "Information according to § 5 Digital Services Act (DDG)" : "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)"}
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
            {isEn ? "Contact" : "Kontakt"}
          </h2>
          <p>
            E-Mail: contact@fischmarktfighters.de
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "Editorial responsibility" : "Redaktionell verantwortlich"}
          </h2>
          <p>
            {name}<br />
            {street}<br />
            {city}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "Consumer dispute resolution" : "Verbraucherstreitbeilegung"}
          </h2>
          <p>
            {isEn 
              ? "We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board." 
              : "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."}
          </p>
        </section>
      </div>
    </div>
  );
}
