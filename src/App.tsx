import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Console from './components/Console';
import { StatusProvider } from './hooks/useStatus';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Systems from './pages/Systems';
import Portfolio from './pages/Portfolio';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <StatusProvider>
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 relative min-w-0">
            <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-grid" />
            <div className="fixed inset-0 pointer-events-none bg-glow-cyan" />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/systems" element={<Systems />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <div className="h-44" />
            <Console />
          </div>
        </div>
      </StatusProvider>
    </BrowserRouter>
  );
}
