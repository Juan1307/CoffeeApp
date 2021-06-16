// config vars
process.env.PORT = process.env.PORT || 3000;

// config db
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const DBENV = (process.env.NODE_ENV === 'dev') ? 
			'mongodb://localhost:27017/dbcoffe'
			:'mongodb://Antik:sjvd9tlPksNOQKnt@cluster0-shard-00-00.cdztu.mongodb.net:27017,cluster0-shard-00-01.cdztu.mongodb.net:27017,cluster0-shard-00-02.cdztu.mongodb.net:27017/dbcoffe?ssl=true&replicaSet=atlas-te1szy-shard-0&authSource=admin&retryWrites=true&w=majority';

process.env.URL_ENV = DBENV;

// sjvd9tlPksNOQKnt