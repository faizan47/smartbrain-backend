const util = require('util');
const crypto = require('crypto');
const scrypt = util.promisify(crypto.scrypt);

const passwordCheck = async (supplied, saved) => {
	const [ hash, salt ] = saved.split('.');
	const buff = await scrypt(supplied, salt, 64);
	return buff.toString('hex') === hash;
};

module.exports = passwordCheck;
