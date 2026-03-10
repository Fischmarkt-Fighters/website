import { useTranslation } from 'react-i18next';
import { Button } from './Button';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  const currentLang = i18n.language || 'de';

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="font-mono font-bold flex items-center gap-2 hover:bg-white/5 transition-colors border border-zinc-800"
    >
      <span className="text-sm">
        {currentLang.toLowerCase().startsWith('de') ? '🇩🇪' : '🇺🇸'}
      </span>
      <span className="text-[10px] tracking-widest">
        {currentLang.toUpperCase()}
      </span>
    </Button>
  );
}