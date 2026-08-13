
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from './layout/main';

// Pages
import TechnologiesPage from './pages/TechnologiesPage';
import RoadmapsPage from './pages/RoadmapsPage';
import TopicsPage from './pages/TopicsPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Navigate to="/technologies" replace />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/roadmaps/:techId" element={<RoadmapsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topicId" element={<TopicsPage />} />
          <Route path="*" element={<Navigate to="/technologies" replace />} />
        </Route>
      </Routes>
    </>
  );
}
