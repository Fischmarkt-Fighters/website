import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Menu, X, Instagram, Twitch } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_nobg.png';

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

export function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: t('nav.home'), path: '#home' },
    { name: t('nav.about'), path: '#about' },
    { name: t('nav.team'), path: '#team' },
    { name: t('nav.matches'), path: '#matches' },
    { name: t('nav.contact'), path: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.substring(1);
      
      if (location.pathname !== '/') {
        navigate('/' + path);
        // The scroll will be handled by the hash in URL or a custom mechanism
        // But for immediate effect if we are on Home already:
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
      <div className="container-fluid mx-auto px-4 md:px-6 flex h-24 items-center justify-between">
        <div className="relative h-24 w-40 flex items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="absolute -left-2 md:-left-4 group z-10">
            <img 
              src={logo} 
              alt="Fischmarkt Fighters" 
              className="h-28 w-auto object-contain invert grayscale hover:grayscale-0 transition-all duration-700 max-w-none" 
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 font-sans font-black uppercase italic tracking-wider text-sm">
          {navItems.map((item) => (
            <a 
              key={item.path} 
              href={item.path} 
              onClick={(e) => handleNavClick(e, item.path)}
              className="hover:text-white text-zinc-500 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LanguageToggle />
          <div className="flex gap-4 border-l border-zinc-800 pl-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitch.tv/fischmarktfighters" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <Twitch className="w-4 h-4" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Burger */}
        <button className="md:hidden p-2 text-zinc-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-black border-b border-zinc-900 p-8 flex flex-col gap-6 z-50 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="font-sans font-black uppercase italic tracking-widest text-xl text-zinc-500 hover:text-white"
              onClick={(e) => handleNavClick(e, item.path)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-zinc-800">
            <LanguageToggle />
            <div className="flex gap-6">
              <Instagram className="w-6 h-6 text-zinc-500 hover:text-white" />
              <Twitch className="w-6 h-6 text-zinc-500 hover:text-white" />
              <TikTokIcon className="w-6 h-6 text-zinc-500 hover:text-white" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
