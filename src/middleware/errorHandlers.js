const exceptionsHandler = fn => (req, res, next) => {
  fn(req, res).catch((e) => next(e));
}

module.exports = exceptionsHandler;