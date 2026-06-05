import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about"     element={<About />} />
          </Routes>
        </div>
        <footer className="border-t border-ghost-700 py-4 px-4 text-center">
          <span className="font-mono text-xs text-ghost-500">
            node@homelab ~ <span className="text-cyan-500/60">■</span>
          </span>
        </footer>
      </div>
    </BrowserRouter>
  );
}
