const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session); // remember to curry and pass the session
const knex = require('./../data/dbConfig.js'); // needed for storing sessions in the database

const apiRouter = require('./api-router.js');

const server = express();

const sessionConfig = {
	name: 'ana', //name of the cookie
	secret: 'keep it', //
	cookie: {
		maxAge: 1000 * 30, //the cookie/session valid for 30 seconds
		secure: false, //Https. True in production
		httpOnly: true //cookie can't be accessed by javascript
	},
	resave: false,
	saveUninitialized: false, //GDPR laws against saving cookie automatically. User has to accept it
	store: new KnexStore({
		knex,
		tablename: 'sessions',
		createtable: true,
		sidfieldname: 'sid',
		clearInterval: 1000 * 60 * 15
	})
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', apiRouter);

module.exports = server;
