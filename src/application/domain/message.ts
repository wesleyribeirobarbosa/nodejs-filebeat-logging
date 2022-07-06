import ApplicationError from '../../shared/error/application.error';
import { error, success } from '../../shared/either';
import ErrorTypes from '../../shared/error/error.types';
import { MessageValidationResponse } from '../../shared/types/response.types';
import { errorLogger } from '../../shared/logger';

export default class Message {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  static create(message: string): MessageValidationResponse {
    if (message === undefined || message == null) {
      const applicationError = new ApplicationError(
        ErrorTypes.VALIDATION_ERROR,
        'Invalid message!',
      );
      errorLogger.error(applicationError);
      return error(applicationError);
    }

    return success(new Message(message));
  }
}
