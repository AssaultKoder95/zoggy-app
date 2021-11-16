function logger(req, res, next) {
  console.log(
    `Request URL: ${
      req.url
    } \nLog Time: ${new Date().toUTCString()} \n==============`
  );
  next(); // tells your app to proceed to next step
}

function auth(req, res, next) {
  // Do user authentication in this middleware
  console.log("AUTH MIDDLEWARE CALLED");
  next();
}

module.exports = {
  logger,
  auth,
};
