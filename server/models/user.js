const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			role: this.role
		},
		process.env.JWTPRIVATEKEY,
		{
			expiresIn: "7d",
		}
	);
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		role: Joi.string().valid('user', 'admin').default('user')
	});
	return schema.validate(data);
};

module.exports = { User, validate };
