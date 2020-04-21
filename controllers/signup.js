const util = require('util');
const crypto = require('crypto');
const scrypt = util.promisify(crypto.scrypt);
const knex = require('./knex');

const signUp = async (req, res) => {
	let { name, email, password } = req.body;
	const salt = crypto.randomBytes(8).toString('hex');
	const buff = await scrypt(password, salt, 64);
	password = `${buff.toString('hex')}.${salt}`;
	try {
		await knex('users').insert({ name, email, password, joined: new Date() });
		res.status(200).json('Your account has been created!');
	} catch (error) {
		res.status(400).json(error);
	}
};
module.exports = signUp;
