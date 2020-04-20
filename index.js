require('dotenv').config(); // only needed to import environment variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
const cookieSession = require('cookie-session');
const cors = require('cors');
app.use(cookieSession({ keys: [ '2zFA7#Sn6RbHcs' ] }));
app.use(cors());

const knex = require('knex')({
	client: 'pg',
	connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/smartbrain` //assuming the db name to be smartbrain
});

app.use(bodyParser.json());

const passwordCheck = async (supplied, saved) => {
	const [ hash, salt ] = saved.split('.');
	const buff = await scrypt(supplied, salt, 64);
	return buff.toString('hex') === hash;
};

const isLoggedIn = (req, res, next) => {
	if (!req.session.userId) return res.send('You are not allowed to perform this action.');
	next();
};

app.post('/signup', async (req, res) => {
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
});

app.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	const row = await knex('users').where({ email });
	if (row.length) {
		const storedPassword = row[0].password;
		const userId = row[0].id;
		const isVerified = await passwordCheck(password, storedPassword);
		if (isVerified) {
			req.session.userId = userId;
			res.status(200).json('Success!');
		} else {
			res.status(404).json('Sorry, incorrect password.');
		}
	} else {
		res.status(404).json('Something went wrong. Check your email or password.');
	}
});

app.post('/update-score', isLoggedIn, async (req, res) => {
	const { userId } = req.session;
	let score = req.body.score;
	await knex('users').increment('score', score).where({ id: userId });
	res.send('Score updated');
});
app.post('/signout', isLoggedIn, async (req, res) => {
	try {
		req.session.userId = null;
		res.status(200).json('You have been signed out!');
	} catch (error) {
		res.status(404).json(error);
	}
});

app.listen(3001, () => console.log('Listening on port 3001!'));
