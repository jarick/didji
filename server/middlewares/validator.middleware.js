
export default {

  validate(schema) {
    return (req, res, next) => {
      req.check(schema);
      req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
          res.status(400).json({
            reason: 'validate',
            errors: result.useFirstErrorOnly().array()
          });
        } else {
          next();
        }
      });
    }
  }

};
