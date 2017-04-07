
import validator from '../middlewares/validator.middleware';
import schema from '../validators/point.validator';

const express = require('express');
const util = require('util');

const router = express.Router();

router.get('/:session', (req, res) => {
  req.checkParams('session', 'Invalid session').notEmpty();
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    const session = req.sanitize('session').trim();
    req.context.points.fetchBySession(session).then(
      (data) => res.json(data)
    );
  });
});

router.post('/', validator.validate(schema), (req, res) => {
  const x = req.sanitize('x').toInt();
  const y = req.sanitize('y').toInt();
  const opacity = req.sanitize('opacity').toInt();
  const session = req.sanitize('session').trim();
  req.context.points.create(x, y, opacity, session).then(
    () => res.json({status: 'ok'})
  )
});

export default router;