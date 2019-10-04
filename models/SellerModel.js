const express = require('express');
const mongoose = require('mongoose');
const db = require('../server');

var Schema = mongoose.Schema;

var sellerSchema = new Schema({

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
	}
});


var Seller = mongoose.model('seller',sellerSchema);

module.exports = Seller;