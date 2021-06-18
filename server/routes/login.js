const express = require('express');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const User = require('../models/user');
const app = express();

app.post('/login',(req, res) => {
	let { email, password } = req.body;

	User.findOne({ email }, (err, resDB) => {
		if (err) return res.status(500).json({
			ok: false,
			err
		});

		if (!resDB) return res.status(400).json({
			ok:false,
			err:{
				message:'OOops user not found'
			}
		});

		if (!bcrypt.compareSync(password, resDB.password )) return res.status(400).json({
			ok:false,
			err:{
				message:'Password not valid'
			}
		});

		const token = jwt.sign({ user: resDB }, process.env.SEED_TOKEN ,{ expiresIn: process.env.EXPIRES_TOKEN});

		res.json({
			ok: true,
			resDB,
			token
		});
	});

});

module.exports = app;