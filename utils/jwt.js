const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // Auth Header: Bearer user-token => ["Bearer", "user-token"] => "user-token"

  console.log("rcvd token", token);

  // 401 HTTP Code => User is not authorized from doing this action
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log("err", err);

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
