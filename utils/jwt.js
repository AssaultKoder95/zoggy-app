const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1800s",
  });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // 401 HTTP Code => User is not authorized from doing this action
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    // 403 HTTP Code => User is forbidden from doing this action
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
