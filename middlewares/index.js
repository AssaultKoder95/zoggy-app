const { authenticateToken } = require("../utils/jwt");

function logger(req, res, next) {
  console.log(
    `Request URL: ${
      req.url
    } \nLog Time: ${new Date().toUTCString()} \n==============`
  );
  next(); // tells your app to proceed to next step
}

function auth(req, res, next) {
  console.log(
    `Incoming Authorization Request \nLog Time: ${new Date().toUTCString()}`
  );
  return authenticateToken(req, res, next);
}

module.exports = {
  logger,
  auth,
};
