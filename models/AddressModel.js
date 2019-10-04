const express = require('express');
const mongoose = require('mongoose');
const db = require('../server');

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