var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

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