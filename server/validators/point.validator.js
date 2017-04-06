
export default {
  id: {
    in: 'query',
    optional: true,
    isLength: {
      options: [{ min: 2, max: 10 }],
      errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
    }
  },
  x: {
    in: 'body',
    notEmpty: true,
    isInt: {
      errorMessage: '%0 is not an integer'
    }
  },
  y: {
    in: 'body',
    notEmpty: true,
    isInt: {
      errorMessage: '%0 is not an integer'
    }
  },
  opacity: {
    in: 'body',
    notEmpty: true,
    isInt: {
      options: [{ min: 0, max: 9 }],
      errorMessage: '%0 is not an integer or must be between 2 and 10 chars long'
    }
  },
  session: {
    in: 'body',
    notEmpty: true
  }
}
