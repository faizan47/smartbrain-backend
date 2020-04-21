const knex = require('./knex');

const updateScore = async (req, res) => {
	const { score, id } = req.body;
	try {
		await knex('users').increment('score', score).where({ id });
		res.status(200).json('Score updated');
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
};

module.exports = updateScore;
