
import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { GameRoom } from './pages/GameRoom';
import { Lobby } from './pages/Lobby';
import { PuzzlePage } from './pages/Puzzle';
import { Profile } from './pages/Profile';
import { DemoBoard } from './pages/DemoBoard';
import { Records } from './pages/Records';
import { Books } from './pages/Books';
import { LanguageProvider } from './contexts/LanguageContext';

/**
 * Cloud Go App Architecture
 * 
 * Frontend: React + Tailwind
 * Backend (Planned): Supabase (Auth, DB, Realtime, Storage)
 * 
 * Key Features:
 * 1. MemoryRouter used for maximum compatibility (fixes Location.assign errors in blobs).
 * 2. Mobile-first layout with responsive SVG Board.
 * 3. GoEngine handles Logic (SGF, Captures, Ko).
 * 4. MockService simulates Backend data for the prototype.
 * 5. Internationalization via LanguageContext.
 */

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MemoryRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameRoom />} />
            <Route path="/puzzles" element={<PuzzlePage />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/demo" element={<DemoBoard />} />
            <Route path="/records" element={<Records />} />
            <Route path="/books" element={<Books />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </LanguageProvider>
  );
};

export default App;
