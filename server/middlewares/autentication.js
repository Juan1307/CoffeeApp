const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
	let token = req.get('Authorization');

	jwt.verify(token, process.env.SEED_TOKEN , (err, decode) => {
		if (err) return res.status(401).json({
			ok: false,
			err:{
				message:'Token no valido'
			}
		});

		req.user = decode.user;
		next();
	});
};

let verifyRole = (req, res, next) => {

	if (req.user.role !== 'ADMIN_ROLE') return res.status(401).json({
		ok: false,
		err:{
			message:'You are not Admin'
		}
	});

	next();
};


module.exports = {
	verifyToken,
	verifyRole
}