const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

const User = require('./UserModel')
const Toy = require('./ToyModel');
const Adress = require('./AddressModel');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Awsome Connected Succesfully");
});

const Schema = mongoose.Schema;

const orderSchema = new Schema({

	user_id:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	date:{
		type:Date,
		required:true
	},
	status:{
		type:String,
		required:true
	} 
})

const Order = mongoose.model('order',orderSchema);

module.exports = Order;