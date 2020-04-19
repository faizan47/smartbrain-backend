require('dotenv').config(); // only needed to import environment variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex')({
	client: 'pg',
	connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/smartbrain`
});

console.log(process.env.DB_HOST);
app.use(bodyParser.json());

app.post('/', async (req, res) => {
	const { name, email, password } = req.body;
	await knex('users').insert({ name, email, password, joined: new Date() });
	console.log(req.body, 'inserted successfully');
	res.send('Data saved successfully');
});

app.listen(3000, () => console.log('Listening on port 3000!'));
