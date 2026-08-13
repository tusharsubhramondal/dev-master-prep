// Master Topics Aggregator
import { javascriptTopics } from './topics/javascriptTopics.js';
import { nodejsTopics } from './topics/nodejsTopics.js';
import { phpTopics } from './topics/phpTopics.js';
import { laravelTopics } from './topics/laravelTopics.js';
import { reactTopics } from './topics/reactTopics.js';
import { mysqlTopics } from './topics/mysqlTopics.js';
import { postgresTopics } from './topics/postgresTopics.js';
import { mongoTopics } from './topics/mongoTopics.js';
import { redisTopics } from './topics/redisTopics.js';
import { dockerTopics } from './topics/dockerTopics.js';
import { gitTopics } from './topics/gitTopics.js';
import { linuxTopics } from './topics/linuxTopics.js';
import { awsTopics } from './topics/awsTopics.js';
import { restTopics } from './topics/restTopics.js';

export const topicsData = {
  ...javascriptTopics,
  ...nodejsTopics,
  ...phpTopics,
  ...laravelTopics,
  ...reactTopics,
  ...mysqlTopics,
  ...postgresTopics,
  ...mongoTopics,
  ...redisTopics,
  ...dockerTopics,
  ...gitTopics,
  ...linuxTopics,
  ...awsTopics,
  ...restTopics
};
