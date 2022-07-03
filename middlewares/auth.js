const jwt = require('jsonwebtoken');

const hash = process.env.SECRET_HASH;

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token)
    return res.status(401).json({
      status: 'fail',
      message:
        'Please, set on header request your token access aquired on /auth route',
    });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  jwt.verify(token, hash, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }
    req.decoded = decoded;
    next();
  });
};
