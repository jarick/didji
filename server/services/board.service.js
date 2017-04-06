
import type {Config, PointService, SessionService, BoardService as Impl} from '../contracts/services';
import type {BoardEntity} from '../contracts/entities';
import type {Board} from '../contracts/models';
import BoardModel from '../models/board.model';

export default class BoardService implements Impl {

  config: Config;
  points: PointService;
  sessions: SessionService;
  model: BoardModel;

  constructor(config, points, sessions) {
    this.config = config;
    this.points = points;
    this.sessions = sessions;
    this.model = new BoardModel(config);
  }

  getModel(): BoardModel {
    return this.model;
  }

  async get(): Promise<Board> {
    const list: Array<BoardEntity> = await this.model.fetch();
    const item: BoardEntity = list[0];
    return {
      id: item.id,
      name: item.name,
      session: await this.sessions.get(item.session),
      points: await this.points.fetchBySession(item.session)
    }
  }

  async complete(id: string): Promise<void> {
    await this.sessions.complete(id);
    const list: Array<BoardEntity> = await this.model.fetch();
    const save: Array<BoardEntity> = list.map(
      (item: BoardEntity) => item.session = id
    );
    this.model.save(save);
  }

}