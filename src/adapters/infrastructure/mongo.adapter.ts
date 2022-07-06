import { connect } from 'mongoose';

import 'dotenv/config';
import { SaveHelloWorldRepositoryResponse } from '../../shared/types/response.types';
import { error, success } from '../../shared/either';
import ErrorTypes from '../../shared/error/error.types';
import HelloWorldRepository from '../../application/ports/resources/helloworld.repository';
import HelloWorldModel from '../../config/database/models/hello.world';
import ApplicationError from '../../shared/error/application.error';
import { errorLogger } from '../../shared/logger';

export default class MongoAdapter implements HelloWorldRepository {
  async connect(): Promise<void> {
    try {
      await connect(
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`,
      );
    } catch (e) {
      errorLogger.error(e);
    }
  }

  async saveMessage(
    message: string,
  ): Promise<SaveHelloWorldRepositoryResponse> {
    try {
      const helloWorldModel = new HelloWorldModel({ message });
      const response = await helloWorldModel.save();
      return success(response.message);
    } catch (e) {
      const applicationError = new ApplicationError(
        ErrorTypes.DATABASE_ERROR,
        e.toString(),
      );
      errorLogger.error(applicationError);
      return error(applicationError);
    }
  }
}
