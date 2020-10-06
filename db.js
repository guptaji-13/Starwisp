const { createPool } = require(`mysql`);

const pool = createPool({
	host: 'localhost', // MySQL host (default: 'localhost')
	user: 'root', // MySQL user (default: 'root')
	password: 'password', // MySQL password
	database: 'starwisp', // MySQL database
	connection: 10, // No. of connections for pool
});
const create = (
	quotation_id,
	university_name,
	number_of_students,
	number_of_teachers,
	number_of_employees,
	contact_number
) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`insert into quotations values(?, ?, ?, ?, ?, ?)`,
			[
				quotation_id,
				university_name,
				number_of_students,
				number_of_teachers,
				number_of_employees,
				contact_number,
			],
			(err, result, fields) => {
				if (err) {
					reject({
						status: 500,
						message: err.message,
					});
				}
				resolve({
					status: 200,
					message: 'new quotation created',
				});
			}
		);
	});
};

const read = id => {
	return new Promise((resolve, reject) => {
		pool.query(
			`select * from quotations where quotation_id = ?`,
			[id],
			(err, result, fields) => {
				if (err) {
					reject({
						status: 500,
						message: err.message,
					});
				}
				if (result.length) {
					resolve({
						status: 200,
						message: result[0],
					});
				} else {
					reject({
						status: 404,
						message: 'quotation_id not found',
					});
				}
			}
		);
	});
};

const update = (id, field, value) => {
	return new Promise((resolve, reject) => {
		var data = JSON.parse(`{"${field}":"${value}"}`);
		//console.log(data);
		pool.query(
			`update quotations set ? where quotation_id = ?`,
			[data, id],
			(err, result, fields) => {
				if (err) {
					reject({
						status: 500,
						message: err.message,
					});
				}
				if (result.affectedRows) {
					resolve({
						status: 200,
						message: `${field} updated for quotation_id: ${id}`,
					});
				} else {
					reject({
						status: 404,
						message: 'quotation_id not found',
					});
				}
			}
		);
	});
};

const deletes = id => {
	return new Promise((resolve, reject) => {
		pool.query(
			`delete from quotations where quotation_id = ?`,
			[id],
			(err, result, fields) => {
				if (err) {
					reject({
						status: 500,
						message: err.message,
					});
				}
				if (result.affectedRows) {
					resolve({
						status: 200,
						message: `Entry with quotation_id: ${id} deleted`,
					});
				} else {
					reject({
						status: 404,
						message: 'quotation_id not found',
					});
				}
			}
		);
	});
};

module.exports.create = create;
module.exports.read = read;
module.exports.update = update;
module.exports.deletes = deletes;
