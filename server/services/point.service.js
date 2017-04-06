
import type {Config, SessionService, PointService as Impl} from '../contracts/services';
import type {PointEntity} from '../contracts/entities';
import type {Point, Session} from '../contracts/models';
import PointModel from '../models/point.model';
const uniqid = require('uniqid');

export default class PointService implements Impl {

  config: Config;
  model: PointModel;
  sessions: SessionService;

  constructor(config, sessions) {
    this.config = config;
    this.model = new PointModel(config);
    this.sessions = sessions;
  }

  getModel(): PointModel {
    return this.model;
  }

  async create(x: number, y: number, opacity: number, session: string): Promise<void> {
    const find: Session =  await this.sessions.get(session);
    const id: string = uniqid();
    const data: PointEntity = {id, x, y, opacity, session: find.id};
    await this.model.save(data);
  }

  async fetchBySession(session: string): Promise<Array<Point>> {
    const find: Session = await this.sessions.get(session);
    const list: Array<PointEntity> = await this.model.fetch();
    return list.filter(_ => _.session === find.id).map(_ => ({
      id: _.id,
      x: _.x,
      y: _.y,
      opacity: _.opacity,
      session: find
    }))
  }

}