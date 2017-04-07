
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  req.context.boards.get().then(
    (data) => res.json(data)
  );
});

router.post('/complete/:session', (req, res) => {
  req.checkParams('session', 'Invalid session').isAlpha();
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    const session = req.sanitize('session').trim();
    req.context.sessions.complete(session).then(
      (data) => res.json({status: 'ok'})
    );
  });
});

export default router;
