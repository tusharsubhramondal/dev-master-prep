import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TechCatalog from './components/TechCatalog';
import TechOverview from './components/TechOverview';
import TopicPage from './components/TopicPage';
import RoadmapView from './components/RoadmapView';
import ComparisonView from './components/ComparisonView';
import InterviewPlatform from './components/InterviewPlatform';
import ProjectsView from './components/ProjectsView';
import SystemDesignView from './components/SystemDesignView';
import UserDashboard from './components/UserDashboard';
import AdminSchemaInspector from './components/AdminSchemaInspector';
import SearchModal from './components/SearchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedTechId, setSelectedTechId] = useState('javascript');
  const [selectedTopicId, setSelectedTopicId] = useState('javascript-closure');
  
  const [theme, setTheme] = useState('dark');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.className = nextTheme === 'light' ? 'light-theme' : 'dark';
  };

  // Keyboard shortcut Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for navigating between entities
  const handleSelectTech = (techId) => {
    setSelectedTechId(techId);
    setActiveTab('tech-overview');
  };

  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setActiveTab('topic-page');
  };

  const handleSelectRoadmap = (techId) => {
    setSelectedTechId(techId);
    setActiveTab('roadmaps');
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'light' ? 'light-theme' : ''}`}>
      
      {/* Left Navigation Sidebar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area (Offset by left sidebar width md:pl-64) */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-7xl w-full mx-auto">
          {activeTab === 'catalog' && (
            <TechCatalog
              onSelectTech={handleSelectTech}
              onSelectRoadmap={handleSelectRoadmap}
            />
          )}

          {activeTab === 'tech-overview' && (
            <TechOverview
              techId={selectedTechId}
              onSelectTopic={handleSelectTopic}
              onBackToCatalog={() => setActiveTab('catalog')}
              onSelectTech={handleSelectTech}
            />
          )}

          {(activeTab === 'topic-page' || activeTab === 'learn') && (
            <TopicPage
              topicId={selectedTopicId}
              onSelectTopic={handleSelectTopic}
              onBackToTech={() => setActiveTab('tech-overview')}
            />
          )}

          {activeTab === 'roadmaps' && (
            <RoadmapView
              activeTechId={selectedTechId}
              onSelectTopic={handleSelectTopic}
            />
          )}

          {activeTab === 'compare' && (
            <ComparisonView />
          )}

          {activeTab === 'interview' && (
            <InterviewPlatform />
          )}

          {activeTab === 'projects' && (
            <ProjectsView />
          )}

          {activeTab === 'system-design' && (
            <SystemDesignView />
          )}

          {activeTab === 'dashboard' && (
            <UserDashboard onSelectTech={handleSelectTech} />
          )}

          {activeTab === 'admin' && (
            <AdminSchemaInspector />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-[#1e293b] bg-[#090d16] py-6 px-4 text-center text-xs text-slate-400 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-extrabold text-white tracking-tight">DEV MASTER</span>
            <span className="text-indigo-400 font-bold">by AppZone</span>
            <span className="text-slate-600">•</span>
            <span>Unified Developer Knowledge &amp; Interview Preparation Platform</span>
          </div>
          <p className="text-[11px] text-slate-400">
            LEARN → UNDERSTAND → PRACTICE → BUILD → INTERVIEW → ADVANCE
          </p>
        </footer>
      </div>

      {/* Global Cmd+K Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTopic={handleSelectTopic}
        onSelectTech={handleSelectTech}
        onNavigate={setActiveTab}
      />

    </div>
  );
}
