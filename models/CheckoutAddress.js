const express = require('express');
const mongoose = require('mongoose');
const db = require('../server');

var Schema = mongoose.Schema;

var chechoutAddressSchema = new Schema({

	user_id:{
		type:Schema.Types.ObjectId,
		required:true
	},
	firstname:{ 
		type: String,
		required:true
	},
	lastname:{
		type:String,
		required:true
	},
	mobile:{
		type:Number
	},
	email:{
		type:String,
	},
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
	}
});


var ChechoutAddress = mongoose.model('chechoutAddress', chechoutAddressSchema);

module.exports = ChechoutAddress;