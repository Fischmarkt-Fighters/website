import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Header } from './components/Layout/Header';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import logo from './assets/logo.png';

// Pages
import Home from './pages/Home';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth',
          });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-black font-sans text-white relative selection:bg-white selection:text-black">
          {/* Global Background Logo Overlay */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] flex items-center justify-center overflow-hidden">
             <img src={logo} alt="" className="w-[70%] max-w-[900px] h-auto object-contain grayscale" />
          </div>

          <Header />
          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/privacy" element={<Privacy />} />
              {/* Fallback to home for any other path */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          
          <footer className="py-24 border-t border-zinc-900 bg-black relative z-10">
            <div className="container mx-auto px-4 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
                <Link to="/imprint" className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                  {t('footer.imprint')}
                </Link>
                <Link to="/privacy" className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </div>

              <div className="space-y-4">
                <p className="text-base font-sans font-black italic uppercase tracking-wider">
                  {t('footer.copyright', { year: new Date().getFullYear() })}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
