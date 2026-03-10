import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Header } from './components/Layout/Header';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Team from './pages/Team';
import Matches from './pages/Matches';
import Contact from './pages/Contact';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-black font-sans text-white relative selection:bg-white selection:text-black">
          {/* Background Skeleton Koi Overlay */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] flex items-center justify-center overflow-hidden">
             <svg viewBox="0 0 500 500" className="w-[120%] h-[120%] rotate-12 scale-150 fill-none stroke-white">
                {/* Simplified Koi Skeleton Path Representation */}
                <path d="M100,250 C100,150 250,50 400,150 C450,200 450,300 400,350 C250,450 100,350 100,250 M150,250 L350,250 M200,200 L200,300 M250,180 L250,320 M300,200 L300,300" strokeWidth="2" />
                <path d="M400,150 Q450,100 480,150 T450,200" strokeWidth="1" />
                <path d="M400,350 Q450,400 480,350 T450,300" strokeWidth="1" />
                <circle cx="130" cy="230" r="5" strokeWidth="1" />
             </svg>
          </div>

          <Header />
          <main className="flex-1 relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Home />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/team" 
                  element={
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Team />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/matches" 
                  element={
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Matches />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Contact />
                    </motion.div>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </main>
          
          <footer className="py-20 border-t border-zinc-900 text-center text-[10px] font-mono text-zinc-600 bg-black relative z-10">
            <p className="uppercase tracking-[0.5em]">&copy; {new Date().getFullYear()} Fischmarkt Fighters Hamburg</p>
            <p className="mt-4 text-[8px] opacity-50 uppercase tracking-[0.3em]">est. in the harbor / competing in the cloud</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;