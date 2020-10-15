const Sequelize = require('sequelize');
const sequelize = new Sequelize('starwisp', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
});

// Model
const User = sequelize.define(
  'user',
  {
    user_id: {
      type: Sequelize.STRING(256),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Create
const register = (id, password) => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() =>
        User.create({
          user_id: id,
          password: password,
        })
      )
      .then(data => {
        resolve({
          success: true,
          status: 200,
          message: `New user registerred`,
        });
      })
      .catch(err => {
        reject({
          success: false,
          status: 400,
          message: err.errors[0].message,
        });
      });
  });
};

// Login
const login = id => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        User.findAll({
          where: {
            user_id: id,
          },
        }).then(data => {
          if (data.length) {
            resolve({
              success: true,
              status: 200,
              message: data[0].password,
            });
          } else {
            reject({
              success: false,
              status: 404,
              message: `User_ID not found.`,
            });
          }
        });
      })
      .catch(err => {
        reject({
          success: false,
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.register = register;
module.exports.login = login;
