import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoadmapView from '../components/RoadmapView';

export default function RoadmapsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTechId = searchParams.get('tech') || 'javascript';

  const handleSelectTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  return (
    <RoadmapView
      activeTechId={activeTechId}
      onSelectTopic={handleSelectTopic}
    />
  );
}
