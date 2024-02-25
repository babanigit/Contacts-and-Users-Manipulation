const errorHandler = (err, next ,req, res) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({
    message: err.message,
    stackTrace: err.stack,
  });
};

module.export = {
  errorHandler,
};
