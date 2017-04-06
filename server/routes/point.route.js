
import type {Services} from '../contracts/services';
import validator from '../middlewares/validator.middleware';
import schema from '../validators/point.validator';

const express = require('express');
const util = require('util');

export default (services: Services) => {
  const router = express.Router();

  router.get('/:session', (req, res) => {
    req.checkParams('session', 'Invalid session').isAlpha();
    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      const session = req.sanitize('session').trim();
      services.points.fetchBySession(session).then(
        (data) => res.json(data)
      );
    });
  });

  router.post('/', validator.validate(schema), (req, res) => {
    const x = req.sanitize('x').toInt();
    const y = req.sanitize('y').toInt();
    const opacity = req.sanitize('opacity').toInt();
    const session = req.sanitize('session').trim();
    services.points.create(x, y, opacity, session).then(
      () => res.json({status: 'ok'})
    )
  });

  return router;
}