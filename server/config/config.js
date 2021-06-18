// config vars
process.env.PORT = process.env.PORT || 3000;

// config token

process.env.EXPIRES_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'seed-development';


// config db
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const DBENV = (process.env.NODE_ENV === 'dev') ? 
			'mongodb://localhost:27017/dbcoffe'
			: process.env.MONGO_URI;

process.env.URL_ENV = DBENV;

// sjvd9tlPksNOQKnt