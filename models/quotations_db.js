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
  'quotation',
  {
    quotation_id: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      primaryKey: true,
    },
    university_name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    number_of_students: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    number_of_teachers: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    number_of_employees: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Create
const create = (id, name, students, teachers, employees, contact) => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() =>
        User.create({
          quotation_id: id,
          university_name: name,
          number_of_students: students,
          number_of_teachers: teachers,
          number_of_employees: employees,
          contact_number: contact,
        })
      )
      .then(data => {
        resolve({
          success: true,
          status: 200,
          message: `New entry created`,
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

// Read single entry using Quotation_ID
const read = id => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        User.findAll({
          where: {
            quotation_id: id,
          },
        }).then(data => {
          if (data.length) {
            resolve({
              success: true,
              status: 200,
              message: data,
            });
          } else {
            reject({
              success: false,
              status: 404,
              message: `Quotation_ID not found.`,
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

// Read all entries
const readAll = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        User.findAll().then(data => {
          if (data.length) {
            resolve({
              success: true,
              status: 200,
              message: data,
            });
          } else {
            reject({
              success: false,
              status: 404,
              message: `Table is empty.`,
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

// Update
const update = (id, field, value) => {
  return new Promise((resolve, reject) => {
    var data = JSON.parse(`{"${field}":"${value}"}`);
    sequelize
      .sync()
      .then(() => {
        User.update(data, {
          where: {
            quotation_id: id,
          },
        }).then(data => {
          if (data[0]) {
            resolve({
              success: true,
              status: 200,
              message: `${field} updated for quotation_id: ${id}`,
            });
          } else {
            User.findAll({
              where: {
                quotation_id: id,
              },
            }).then(data => {
              if (data.length) {
                reject({
                  success: false,
                  status: 400,
                  message: `${field} is already ${value}`,
                });
              } else {
                reject({
                  success: false,
                  status: 404,
                  message: `Quotation_ID not found.`,
                });
              }
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

// Delete
const deletes = id => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        User.destroy({
          where: {
            quotation_id: id,
          },
        }).then(data => {
          if (data) {
            resolve({
              success: true,
              status: 200,
              message: data,
            });
          } else {
            reject({
              success: false,
              status: 404,
              message: 'quotation_id not found',
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

module.exports.create = create;
module.exports.read = read;
module.exports.readAll = readAll;
module.exports.update = update;
module.exports.deletes = deletes;
