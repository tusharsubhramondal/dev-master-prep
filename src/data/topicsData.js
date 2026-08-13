// Master Topics Aggregator
import { javascriptTopics } from './topics/javascriptTopics.js';
import { nodejsTopics } from './topics/nodejsTopics.js';

export const topicsData = {
  ...javascriptTopics,
  ...nodejsTopics
};
