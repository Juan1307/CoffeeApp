const { Schema, model } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const rolesValidate = {
	values:['USER_ROLE','ADMIN_ROLE'],
	message:'{VALUE} role not valid'
};

let userSchema = new Schema({
	name:{
		type: String,
		required: [true, 'name is required']
	},
	email:{
		type: String,
    	unique: true,
		required: [true, 'mail is required']
	},
	password:{
		type: String,
		required: [true, 'password is required']		
	},
	img:{
		type: String,
		required: false		
	},
	role:{
		type: String,
		default:'USER_ROLE',
		enum: rolesValidate
	},
	state:{
		type: Boolean,
		default: true
	},
	google:{
		type: Boolean,
		default: false
	}
});

// hide attributes
const { methods } = userSchema;
methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject();

	delete userObject.password;
	return userObject;
};


userSchema.plugin( mongooseUniqueValidator, {message:'{PATH} is UNIQUE required'});

module.exports = model('User', userSchema); 