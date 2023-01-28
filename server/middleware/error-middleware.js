const ApiError = require("../exeptions/api-error");

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.json({ message: err.message, errors: err.errors, status: err.status });
  }
  return res.json({ message: "Unexpected error!", status: 500 });
};
