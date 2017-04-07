
const express = require('express');

const router = express.Router();

router.get('/:session', (req, res) => {
  req.checkParams('session', 'Invalid session').isAlpha();
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
    (data) => res.json({status: 'ok'})
  );
});

export default router;
