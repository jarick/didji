
import type {Services} from '../contracts/services';

const express = require('express');

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
      services.sessions.get(session).then(
        (data) => res.json(data)
      );
    });
  });

  router.post('/', (req, res) => {
    services.sessions.create().then(
      (data) => res.json({status: 'ok'})
    );
  });

  return router;
}
