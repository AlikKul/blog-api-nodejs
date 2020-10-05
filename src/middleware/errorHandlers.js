const exceptionsHandler = fn => (req, res, next) => {
  fn(req, res).catch((e) => {
    return next(e);
  });
}

module.exports = exceptionsHandler;