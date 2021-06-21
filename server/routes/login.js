const express = require('express');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { email, name, picture } = ticket.getPayload();
  // const userid = payload['sub'];

  return { email, name, picture, google: true };
}

app.post('/google', async (req, res) => {
	let { body:{ idtoken:token } } = req;
	
	const googleUser = await verify(token)
	  						 .catch(err => res.status(403).json({ ok:false, err}));
	
	User.findOne({ email: googleUser.email}, (err, resDB) => {
		if(err) return res.status(500).json({
			ok:false,
			err
		});

		if (resDB) {
			if (resDB.google === false) return res.status(500).json({
				ok:false,
				err:{ message:'Autenticate as normal user'}
			});
			else {
				const token = jwt.sign({ user: resDB }, process.env.SEED_TOKEN ,{ expiresIn: process.env.EXPIRES_TOKEN});
				return res.json({
					ok: true,
					resDB,
					token
				});
			}
		} else {
			const user = new User();

			user.name = googleUser.name;
			user.email = googleUser.email;
			user.img = googleUser.picture;
			user.google = true;
			user.password = ':b';

			user.save( (err, resDB) => {
				if(err) res.status(500).json({
					ok:false,
					err
				});

				const token = jwt.sign({ user: resDB }, process.env.SEED_TOKEN ,{ expiresIn: process.env.EXPIRES_TOKEN});
				return res.json({
					ok: true,
					resDB,
					message:'CREATED A NEW USER GOOGLE',
					token
				});
			});
		}

	});

});

module.exports = app;