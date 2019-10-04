var mongoose = require('mongoose');
const db = require('../server');

var Toy = require('./ToyModel')

var Schema = mongoose.Schema;

var toyImageSchema = new Schema({

	toy_id: { 
		type: Schema.Types.ObjectId,
		ref: 'Toy',
		required: true
	},
	path : {
		type:String,
		required: true
	}

});


var ToyImage = mongoose.model('ToyImage',toyImageSchema);

module.exports = ToyImage;