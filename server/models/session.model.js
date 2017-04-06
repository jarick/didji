
import type { SessionEntity } from '../contracts/entities';
import XmlModel from './base.model';

export default class SessionModel extends XmlModel<SessionEntity> {

  get file() {
    return 'sessions.json';
  }

}
