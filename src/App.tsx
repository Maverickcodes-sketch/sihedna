import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ExplorePage } from './components/pages/ExplorePage';
import { UploadPage } from './components/pages/UploadPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { StatisticsPage } from './components/pages/StatisticsPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] dark">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            {/* Catch-all route - redirects any unmatched paths to explore */}
            <Route path="*" element={<ExplorePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}