require('dotenv').config(); // only needed to import environment variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require('cookie-session');
const cors = require('cors');
const sendImage = require('./controllers/clarifai');
const signUp = require('./controllers/signup');
const signOut = require('./controllers/signout');
const login = require('./controllers/login');
const updateScore = require('./controllers/updateScore');

app.use(cookieSession({ keys: [ '2zFA7#Sn6RbHcs' ] }));

app.use(cors());

app.use(bodyParser.json());

app.post('/send-image', async (req, res) => await sendImage(req, res));

app.post('/signup', async (req, res) => await signUp(req, res));

app.post('/login', async (req, res) => await login(req, res));

app.post('/update-score', async (req, res) => await updateScore(req, res));

app.post('/signout', async (req, res) => await signOut(req, res));

app.listen(3001, () => console.log('Listening on port 3001!'));
