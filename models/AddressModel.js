const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

var Schema = mongoose.Schema;

var addressSchema = new Schema({

	home_no:{ 
		type: String,
		required:true
	},
	street:{
		type:String,
		required:true
	},
	city:{
		type:String,
		required:true
	},
	state:{
		type:String,
		required:true
	},
	country:{
		type: String,
		required:true	
	},
	pincode:{
		type:Number,
		required:true
	},
});


var Address = mongoose.model('address',addressSchema);

module.exports = Address;