const express = require('express');
const User = require('../models/user');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const app = express();

app.get('/users', (req, res) => {
	let { query:{ from, limit }} = req;

	from = from || 0;
	limit = limit || 5;
	// google:true
	User.find({},'name email state role google img')
		.skip(Number(from))
		.limit(Number(limit))
		.exec( (err, resDB) => {
			if (err) return res.status(400).json({
				ok:false,
				message: err
			});

			// total rows
			User.countDocuments({}, (err, rows) => {
				if (err) return res.status(400).json({
					ok:false,
					message: err
				});

				res.json({
					ok:true,
					resDB,
					rows
				});
			});

		});
});

app.post('/users', (req, res) => {
	let body = req.body;
	let { name, email, password, role } = body;
		const passHash = bcrypt.hashSync(password, 10);
		
		let user = new User({
			// img: body.img,
			name,
			email,
			password: passHash,
			role
		});

	user.save( (err, resDB) => {
		if (err) return res.status(400).json({
			ok:false,
			message: err
		});

		res.json({ ok: true, resDB });

	});
/*
	if (name === undefined) {
		res.status(400).json({ok:false, message:'Please set name'});
	}else {
		res.json({ person : body });
	}*/
});

app.put('/users/:id', (req, res) => {
	// let id = req.params.id;
	let { params: { id }, body } = req;
	body = _.pick(body,	['name','email','img','role','state'] );

	User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, resDB) => {
		if (err) return res.status(400).json({
			ok:false,
			message: err
		});

		res.json({
			ok: true,
			resDB
		});
	});
});

app.delete('/users/:id', (req, res) => {
	let { id } = req.params;

	User.findByIdAndRemove(id, (err, resDB) => {
		if (err) return res.status(400).json({
			ok:false,
			err
		});

		if (!resDB) return res.status(400).json({
			ok:false,
			err:{ message: 'Id not found'}
		});

		res.json({
			ok:true,
			resDB
		});
	});
});

app.delete('/usersId/:id', (req, res) => {

	let { id } = req.params;
	console.log(id);

	User.findByIdAndUpdate(id, {state: false}, { new: true }, (err, resDB) => {
		if (err) return res.status(400).json({
			ok:false,
			err
		});

		res.json({
			ok:true,
			resDB
		});
	});
});

module.exports = app;