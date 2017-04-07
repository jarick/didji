
import points from './point.route';
import boards from './board.route';
import sessions from './session.route';

const express = require('express');

const router = express.Router();

router.use('/api/v1/points', points);
router.use('/api/v1/boards', boards);
router.use('/api/v1/sessions', sessions);

export default router;
