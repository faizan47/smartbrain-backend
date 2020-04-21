const knex = require('knex')({
	client: 'pg',
	connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/smartbrain` //assuming the db name to be smartbrain
});
module.exports = knex;
