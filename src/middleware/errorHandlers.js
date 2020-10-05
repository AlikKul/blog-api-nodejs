const exceptionsHandler = fn => (req, res, next) => {
  fn(req, res).catch((e) => {
    console.log(e)
    return next(e);
  });
}

module.exports = exceptionsHandler;