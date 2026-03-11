import { useTranslation } from 'react-i18next';

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  // Load from environment variables
  const name = import.meta.env.VITE_IMPRINT_NAME || "Matti Bitomsky";
  const street = import.meta.env.VITE_IMPRINT_STREET || "Lerchenweg 2";
  const city = import.meta.env.VITE_IMPRINT_CITY || "27383 Scheeßel";
  const fullAddress = `${street}, ${city}`;

  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl md:text-6xl font-sans font-black uppercase italic mb-12 tracking-tighter">
        {t('footer.privacy')}
      </h1>
      <div className="prose prose-invert max-w-none font-sans text-zinc-400 space-y-10">
        
        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "1. Data Protection at a Glance" : "1. Datenschutz auf einen Blick"}
          </h2>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">
            {isEn ? "General Information" : "Allgemeine Hinweise"}
          </h3>
          <p>
            {isEn 
              ? "The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you. Detailed information on the subject of data protection can be found in our privacy policy listed under this text."
              : "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung."}
          </p>
          <h3 className="text-lg font-semibold text-zinc-200 mt-6 mb-2">
            {isEn ? "Data Collection on this Website" : "Datenerfassung auf dieser Website"}
          </h3>
          <h4 className="font-bold text-zinc-300">
            {isEn ? "Who is responsible for data collection on this website?" : "Wer ist verantwortlich für die Datenerfassung auf dieser Website?"}
          </h4>
          <p>
            {isEn
              ? "Data processing on this website is carried out by the website operator. You can find their contact details in the section 'Information on the Responsible Body' in this privacy policy."
              : "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen."}
          </p>
          <h4 className="font-bold text-zinc-300 mt-4">
            {isEn ? "How do we collect your data?" : "Wie erfassen wir Ihre Daten?"}
          </h4>
          <p>
            {isEn
              ? "On the one hand, your data is collected by you communicating it to us. This can be, for example, data that you enter into a contact form. Other data is collected automatically or after your consent when visiting the website by our IT systems. This is primarily technical data (e.g., internet browser, operating system, or time of page view). The collection of this data takes place automatically as soon as you enter this website."
              : "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten."}
          </p>
          <h4 className="font-bold text-zinc-300 mt-4">
            {isEn ? "What do we use your data for?" : "Wofür nutzen wir Ihre Daten?"}
          </h4>
          <p>
            {isEn
              ? "Part of the data is collected to ensure error-free provision of the website. Other data can be used to analyze your user behavior."
              : "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "2. Hosting" : "2. Hosting"}
          </h2>
          <p>
            {isEn ? "We host the content of our website with the following provider:" : "Wir hosten die Inhalte unserer Website bei folgendem Anbieter:"}
          </p>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">Hetzner</h3>
          <p>
            {isEn
              ? "Provider is Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Germany (hereinafter Hetzner)."
              : "Anbieter ist die Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen (nachfolgend Hetzner)."}
          </p>
          <p>
            {isEn ? "Details can be found in Hetzner's privacy policy:" : "Details entnehmen Sie der Datenschutzerklärung von Hetzner:"} <a href="https://www.hetzner.com/de/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">https://www.hetzner.com/de/legal/privacy-policy/</a>.
          </p>
          <p>
            {isEn
              ? "The use of Hetzner is based on Art. 6 (1) (f) GDPR. We have a legitimate interest in the most reliable presentation of our website."
              : "Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "3. General Information and Mandatory Information" : "3. Allgemeine Hinweise und Pflichtinformationen"}
          </h2>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">
            {isEn ? "Data Protection" : "Datenschutz"}
          </h3>
          <p>
            {isEn
              ? "The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and according to the legal data protection regulations and this privacy policy."
              : "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."}
          </p>
          <h3 className="text-lg font-semibold text-zinc-200 mt-6 mb-2">
            {isEn ? "Information on the Responsible Body" : "Hinweis zur verantwortlichen Stelle"}
          </h3>
          <p>
            {isEn ? "The responsible body for data processing on this website is:" : "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"}
          </p>
          <p>
            {name}<br />
            {fullAddress}
          </p>
          <p>
            E-Mail: contact@fischmarktfighters.de
          </p>
          
          <h3 className="text-lg font-semibold text-zinc-200 mt-6 mb-2">
            {isEn ? "Storage Period" : "Speicherdauer"}
          </h3>
          <p>
            {isEn
              ? "Unless a more specific storage period has been mentioned within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data."
              : "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben."}
          </p>

          <h3 className="text-lg font-semibold text-zinc-200 mt-6 mb-2">
            {isEn ? "SSL or TLS Encryption" : "SSL- bzw. TLS-Verschlüsselung"}
          </h3>
          <p>
            {isEn
              ? "This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or inquiries that you send to us as the site operator."
              : "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "4. Data Collection on this Website" : "4. Datenerfassung auf dieser Website"}
          </h2>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">
            {isEn ? "Server Log Files" : "Server-Log-Dateien"}
          </h3>
          <p>
            {isEn
              ? "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:"
              : "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:"}
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm">
            <li>{isEn ? "Browser type and version" : "Browsertyp und Browserversion"}</li>
            <li>{isEn ? "Operating system used" : "verwendetes Betriebssystem"}</li>
            <li>{isEn ? "Referrer URL" : "Referrer URL"}</li>
            <li>{isEn ? "Hostname of the accessing computer" : "Hostname des zugreifenden Rechners"}</li>
            <li>{isEn ? "Time of server request" : "Uhrzeit der Serveranfrage"}</li>
            <li>{isEn ? "IP address" : "IP-Adresse"}</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-zinc-200 mt-8 mb-2">
            {isEn ? "Contact Form" : "Kontaktformular"}
          </h3>
          <p>
            {isEn
              ? "If you send us inquiries via the contact form, your details from the inquiry form, including the contact details provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not give this data to third parties without your consent."
              : "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">
            {isEn ? "5. Your Rights" : "5. Ihre Rechte"}
          </h2>
          <p>
            {isEn 
              ? "You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored personal data. You also have a right to request the correction or deletion of this data." 
              : "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen."}
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>{isEn ? "Access (Art. 15 GDPR)" : "Auskunft (Art. 15 DSGVO)"}</li>
            <li>{isEn ? "Rectification (Art. 16 GDPR)" : "Berichtigung (Art. 16 DSGVO)"}</li>
            <li>{isEn ? "Erasure (Art. 17 GDPR)" : "Löschung (Art. 17 DSGVO)"}</li>
            <li>{isEn ? "Restriction of processing (Art. 18 GDPR)" : "Einschränkung der Verarbeitung (Art. 18 DSGVO)"}</li>
            <li>{isEn ? "Data portability (Art. 20 GDPR)" : "Datenübertragbarkeit (Art. 20 DSGVO)"}</li>
            <li>{isEn ? "Objection (Art. 21 GDPR)" : "Widerspruch (Art. 21 DSGVO)"}</li>
          </ul>
          <p className="mt-4">
            {isEn
              ? "Contact us at any time for this purpose. You have the right to lodge a complaint with a supervisory authority."
              : "Kontaktieren Sie uns hierfür jederzeit. Sie haben das Recht auf Beschwerde bei einer Aufsichtsbehörde."}
          </p>
        </section>

        <section className="pt-10 border-t border-zinc-900">
          <p className="text-sm">
            {isEn ? "Source:" : "Quelle:"} <a href="https://www.e-recht24.de" target="_blank" rel="noreferrer" className="text-white hover:underline">https://www.e-recht24.de</a>
          </p>
          <p className="text-sm mt-2">
            <strong>{isEn ? "Status:" : "Stand:"}</strong> {isEn ? "March 2026" : "März 2026"}
          </p>
        </section>

      </div>
    </div>
  );
}
