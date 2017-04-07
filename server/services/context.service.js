
import BoardService from './board.service';
import PointService from './point.service';
import SessionService from './session.service';
import type {Config} from '../contracts/services';

export default (config: Config) => {

  const sessions = new SessionService(config);
  const points = new PointService(config, sessions);
  const boards = new BoardService(config, points, sessions);

  return Promise.all([
    sessions.getModel().sync(),
    points.getModel().sync(),
    boards.getModel().sync()
  ])
    .then(() => ({sessions, points, boards}));
}