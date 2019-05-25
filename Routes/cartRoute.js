const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/CartModel');
const Toy = require('../models/ToyModel');
const User = require('../models/UserModel');
const {ObjectId} = require('mongodb');

mongoose.connect('mongodb://localhost:27017/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Really!! Connected Succesfully");
});


module.exports = function(app){

	
	app.get('/home/cart',function(req,res){

		console.log(req.user._id);

		Cart.find({user_id:req.user._id}).populate('toy_id').exec(function(err,cart){

			if(err) console.log(err);

			console.log(cart);
			res.render('Cart',{user:req.user,toy: cart,count:cart.length});

		});

	});

	app.get('/home/product/addtocart',function(req,res){

		
		Cart.findOne({toy_id:req.query.id,user_id:req.user._id},function(err,cart){

			if(cart==null){
				new Cart({
					toy_id:ObjectId(req.query.id),
					user_id:ObjectId(req.user._id),
					quntity:1
				}).save(function(err){
					console.log(err);
					res.redirect('/home/cart');
				});
			}
			else{

				console.log("Quantity",cart.quntity);
				var quntity = (parseInt(cart.quntity) + 1);
				console.log("New Quantity",quntity);
				Cart.findOneAndUpdate({_id:cart._id},{$set:{quntity:quntity}},function(err,cart){
						console.log(cart);
						res.redirect('/home/cart');
				});

			}
		})
	});

	app.get('/home/cart/onchange',function(req,res){

		console.log(req.query.id);
		console.log(req.query.quantity);

		Cart.findOneAndUpdate({_id:req.query.id},{$set:{quntity:req.query.quantity}},function(err,cart){

			console.log(cart);
			res.redirect('/home/cart')
		})
	})

	app.get('/cart/delete',function(req,res){

		console.log(req.query.id);
		Cart.deleteOne({_id:req.query.id},function(err){

			console.log("delete item");
			res.redirect('/home/cart');	
		});

	})

}