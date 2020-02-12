const mongoose = require('mongoose');

const NewhireSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	uin: {
		type: String,
		required: true
	},
	DOH: {
		type: Date,
		default: Date.now
	},
	Pin: {
		type: String
	},
	StatusCode: {
		type: String,
		default: 00
	}
});

module.exports = mongoose.model('Newhire', NewhireSchema);