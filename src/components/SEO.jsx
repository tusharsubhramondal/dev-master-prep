import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reusable SEO component for dynamic metadata & document title updates
 */
export default function SEO({ 
  title = "DEV MASTER — Developer Learning & Technical Interview Preparation Platform",
  description = "Master 26+ core tech stacks, interactive developer roadmaps, 17-part topic study standards, queue & infrastructure integration labs, and senior interview Q&A bank.",
  keywords = "developer learning, technical interview prep, react 19, node.js, system design, kafka integration, rabbitmq, bullmq, docker, kubernetes, software architect, appzone",
  canonical
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set meta tags
    const setMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // 4. Update Open Graph Tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonical || window.location.href, true);

    // 5. Update Twitter Card Tags
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);

    // 6. Update Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);

  }, [title, description, keywords, canonical, location]);

  return null;
}
