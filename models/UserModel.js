const express = require('express');
const mongoose = require('mongoose');
const Address  = require('./AddressModel');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

var Schema = mongoose.Schema;

var userSchema = new Schema({

	name:{ 
		type: String,
		required:true
	},
	mobile:{
		type:Number,
		max:10
	},
	email:{
		type:String,
	},
	photo:{
		type:String,
		required:true
	},
	google_id:{
		type: String,	
	},
	facebook_id:{
		type:String,
	},
	address:{
		type:Schema.Types.ObjectId,
		ref:'Address',
	}
});


var User = mongoose.model('user',userSchema);

module.exports = User;