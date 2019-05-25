const express = require('express');
const mongoose = require('mongoose');
const Toy = require('./ToyModel');
const User = require('./UserModel');
const {ObjectId} = require('mongodb');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Awsome Connected Succesfully");
});

const Schema = mongoose.Schema;


var cartSchema = new Schema({

		toy_id:{
			type:Schema.Types.ObjectId,
			ref: 'Toy',
			required: true
		},

		user_id:{

			type:Schema.Types.ObjectId,
			ref:'User',
			required:true
		},

		quntity:{
			type: Number,
			required: true
		}

});


var Cart = mongoose.model('Cart',cartSchema);
/*
var nercart = new Cart({

	toy_id:ObjectId("5cbcb274f2ca0f2828e9fe71"),
	user_id:ObjectId("5cbe34c9aa0e6f22c8171f40"),
	quntity:1
})

nercart.save(function(err){

	if(err) console.log(err)

	console.log("Cart Item Succesfully Inserted");

});
*/
module.exports = Cart;