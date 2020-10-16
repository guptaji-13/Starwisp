const jwt = require('jsonwebtoken');
const config = require('config');
const { redisClient } = require('../models/redisClient');

module.exports = async function (req, res, next) {
  try {
    // Get token from the header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token)
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'No token, authorization denied.',
      });

    redisClient
      .multi()
      .lrange('tokenAM', 0, -1)
      .lrange('tokenPM', 0, -1)
      .exec((err, result) => {
        if (result[0].indexOf(token) > -1 || result[1].indexOf(token) > -1) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: 'Not a valid token.',
          });
        }
        //if (err) throw err;
        else {
          try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded.user;
            next();
          } catch (err) {
            return res.status(500).json({
              success: false,
              status: 500,
              message: err.message,
            });
          }
        }
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};
