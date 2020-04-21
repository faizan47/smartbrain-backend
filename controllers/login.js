const passwordCheck = require('./passwordCheck');
const knex = require('./knex');

const login = async (req, res) => {
	const { email, password } = req.body;
	const row = await knex('users').where({ email });
	if (row.length) {
		const storedPassword = row[0].password;
		const userId = row[0].id;
		const isVerified = await passwordCheck(password, storedPassword);
		if (isVerified) {
			req.session.userId = userId;
			res.status(200).json(row);
		} else {
			res.status(404).json('Sorry, incorrect password.');
		}
	} else {
		res.status(404).json('Something went wrong. Check your email or password.');
	}
};

module.exports = login;
