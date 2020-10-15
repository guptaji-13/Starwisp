const users = require(`../models/users`);
const bcrypt = require('bcryptjs');
const config = require('config');
const {redisClient} = require('../models/redisClient');
const jwt = require('jsonwebtoken');

const register = async (
    id,password
  ) => {
      try{
        const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return users.register(
      id, password
    );
      }
      catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message,
        });
      }
  };

  const login = (
    id,password
  ) => {
      return new Promise( async (resolve, reject)=>{
          try{
            const data = await users.login(id);
            const isMatch = await bcrypt.compare(password, data.message);
            if(!isMatch){
                reject({
                    success: false,
                    status: 400,
                    message: `Invalid Credentials`
                })
            }
            const payload = {
                user: {
                  id: id,
                },
              };
              const token = await jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 });
                  resolve({
                    success: true,
                    status: 200,
                    message: token 
                  });
                }
          catch(err){
            reject({
                success: false,
                status: 500,
                message: err.message
            })
          }
      })
  };

const logout = (token) => {
    return new Promise( async (resolve, reject)=>{
      try{
        await redisClient.LPUSH('token', token);
        resolve({
          success: true,
          status: 200,
          message: `You are logged out`
        })
      }
      catch(err){
        reject({
          success: false,
          status: 500,
          message: err.message
      })
      }
      
    }
    );
  }

  module.exports.register = register;
  module.exports.login = login;
  module.exports.logout = logout;