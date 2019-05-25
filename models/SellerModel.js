const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

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