const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

const Order = require('./OrderModel');
const Toy = require('./ToyModel');
const Adress = require('./AddressModel');
const Seller = require('./SellerModel');
const db = require('../server');

const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({

	order_id:{
		type:Schema.Types.ObjectId,
		ref:'Order',
		required:true
	},
	toy_id:{
		type:Schema.Types.ObjectId,
		ref:'Toy',
		required:true
	},
	Seller_id:{
		type:Number,
	},
	address_id:{
		type:Schema.Types.ObjectId,
		ref:'Adress'
	},
	quantity:{
		type:Number,
		required:true
	},
	discount:{
		type:Number,
		required:true
	},
	total:{
		type:Number,
		required:true
	},
	bill_date:{
		type:Date,
		required:true
	},
	ship_date:{
		type:Date,
		required:true
	},
	status:{
		type:String,
		required:true
	},
	tax:{
		type:Number,
		required:true
	}
});



const OrderDetails  = mongoose.model('orderdetails',orderDetailsSchema);


module.exports = OrderDetails;