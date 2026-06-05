import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TinaEditProvider } from 'tinacms/dist/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <TinaEditProvider>
  <App />
  </TinaEditProvider>
  </StrictMode>
);
