import 'reflect-metadata';
import './shared/container';

import httpServer from './config/server/httpServer';
import MongoAdapter from './adapters/infrastructure/mongo.adapter';

import { infoLogger, errorLogger } from './shared/logger';

import 'dotenv/config';

new MongoAdapter()
  .connect()
  .then(async () => {
    httpServer.listen(process.env.PORT || 3001, () => {
      infoLogger.info(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(errorLogger.error);
