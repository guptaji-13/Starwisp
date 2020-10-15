const jwt = require('jsonwebtoken');
const config = require('config');
const {redisClient} = require('../models/redisClient');

module.exports = async function (req, res, next) {
    
  try{
    // Get token from the header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token)
    return res.status(401).json({
      success: false,
      status: 401,
      message: 'No token, authorization denied.' ,
    });
    
    redisClient.lrange('token', 0, -1, (err, result)=>{
      if (err) throw err;
      if (result.indexOf(token) > -1)
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Not a valid token.' ,
      });
    });

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();

  }catch(err){
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message ,
    });
  }
};