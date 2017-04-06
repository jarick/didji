
import type {Services} from '../contracts/services';

const express = require('express');

export default (services: Services) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    services.boards.get().then(
      (data) => res.json(data)
    );
  });

  router.post('/complete/:session', (req, res) => {
    req.checkParams('session', 'Invalid session').isAlpha();
    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      const session = req.sanitize('session').trim();
      services.sessions.complete(session).then(
        (data) => res.json({status: 'ok'})
      );
    });
  });

  return router;
}