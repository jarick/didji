
import ExtendableError from './base.exteptions';

export class SessionNotFoundError extends ExtendableError {

  constructor(id: string) {
    super(`Session ${id} is not found`);
  }

}