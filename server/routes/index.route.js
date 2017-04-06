
import type {Services} from '../contracts/services';
import PointRoute from './point.route';
import BoardRoute from './board.route';
import SessionRoute from './session.route';
const express = require('express');

export default (services: Services) => {
  const router = express.Router();

  router.use('/api/v1/points', PointRoute(services));
  router.use('/api/v1/boards', BoardRoute(services));
  router.use('/api/v1/sessions', SessionRoute(services));

  return router;
}
