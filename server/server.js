require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set static template
app.use( express.static(path.resolve(__dirname,'../views')))

//require routes
app.use(require('./routes/index'));

// db connect
mongoose.connect( process.env.URL_ENV, { 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true ,
		useFindAndModify: false
	}, (err, res) => {
		
	if (err) throw err;
	console.log('Database connected');
});

app.listen(process.env.PORT, () => console.log('listen port',process.env.PORT,process.env.URL_ENV));

