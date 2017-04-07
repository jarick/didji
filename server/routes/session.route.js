
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
    req.context.sessions.get(session).then(
      (data) => res.json(data)
    );
  });
});

router.post('/', (req, res) => {
  req.context.sessions.create().then(
    (id) => res.json({
      status: 'ok',
      id
    })
  );
});

export default router;
