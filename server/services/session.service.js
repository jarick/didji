
import type {Config, PointService, SessionService as Impl} from '../contracts/services';
import type {SessionEntity} from '../contracts/entities';
import type {Session} from '../contracts/models';
import SessionModel from '../models/session.model';
import {SessionNotFoundError} from '../exceptions/session.exceptions';
const uniqid = require('uniqid');

export default class SessionService implements Impl {

  config: Config;
  points: PointService;
  model: SessionModel;

  constructor(config, points) {
    this.config = config;
    this.points = points;
    this.model = new SessionModel(config);
  }

  getModel(): SessionModel {
    return this.model;
  }

  async create(): Promise<string> {
    const id = uniqid();
    const complete = false;
    const data: SessionEntity = {id, complete};
    await this.model.save(data);
    return id;
  }

  async get(id: string): Promise<Session> {
    const list: Array<SessionEntity> = await this.model.fetch();
    const filter: Array<SessionEntity> = list.filter(_ => _.id === id);
    if (filter.length === 0) {
      throw new SessionNotFoundError(id);
    } else {
      const item: SessionEntity = filter[0];
      return {
        id: item.id,
        complete: item.complete
      }
    }
  }

  async complete(id: string): Promise<void> {
   const item: SessionEntity = await this.get(id);
   item.complete = true;
   await this.model.save(item);
  }

}