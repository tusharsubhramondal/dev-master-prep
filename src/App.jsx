
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from './layout/main';
import ScrollToTop from './components/ScrollToTop';

// Pages
import TechnologiesPage from './pages/TechnologiesPage';
import RoadmapsPage from './pages/RoadmapsPage';
import TopicsPage from './pages/TopicsPage';
import IntegrationPage from './pages/IntegrationPage';
import QnaPage from './pages/QnaPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Navigate to="/technologies" replace />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/roadmaps/:techId" element={<RoadmapsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topicId" element={<TopicsPage />} />
          <Route path="/integration" element={<IntegrationPage />} />
          <Route path="/qna" element={<QnaPage />} />
          <Route path="/qna/:techId" element={<QnaPage />} />
          <Route path="*" element={<Navigate to="/technologies" replace />} />
        </Route>
      </Routes>
    </>
  );
}
