require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/user'));

// mongoose.set('useUnifiedTopology', true)
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


app.listen(process.env.PORT, () => console.log('listen port',process.env.PORT));

