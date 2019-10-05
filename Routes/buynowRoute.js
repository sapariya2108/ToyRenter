const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/OrderModel');
const {ObjectId} = require('mongodb');
const Address = require('../models/AddressModel');
const User = require('../models/UserModel')	;
const ChechoutAddress = require('../models/CheckoutAddress');
const Toy = require('../models/ToyModel');
const Cart = require('../models/CartModel');

const app = new express();



module.exports = function(app){


	app.get('/home/checkout1',async function(req,res){

		User.findOne({_id:req.user._id},async function(err,user){

			Address.findOne({_id:user.address}, async function(err,add){

			var toy = await Toy.findOne({_id:req.query.id});

			console.log(toy);
			if(err){

				res.render('checkout1',{user:req.user,toy:toy});
		
			}else{
		
				res.render('checkout1',{user:req.user,address:add,toy:toy});		
		
			}

			})	
			
		})
	})

	app.get('/home/cart/checkout1',function(req,res){

		User.findOne({_id:req.user._id},async function(err,user){

			Address.findOne({_id:user.address}, async function(err,add){

			var cart = await Cart.find({user_id:req.user._id}).populate('toy_id').exec().then();

			if(err){

				res.render('checkout1',{user:req.user,cart:cart});
		
			}else{
		
				res.render('checkout1',{user:req.user,address:add,cart:cart});		
		
			}

			})	
			
		})

	})

	app.get('/home/checkout2',function(req,res){

		if(req.query.addressOption=="ChangeInAddress"){

			new ChechoutAddress({

				user_id:req.user._id,
				firstname:req.query.firstname,
				lastname:req.query.lastname,
				email:req.query.lastname,
				mobile:req.query.mobile,
				home_no:req.query.home_no,
				street:req.query.street,
				city:req.query.city,
				state:req.query.state,
				country:req.query.country,
				pincode:req.query.pincode

			}).save(function(err,address){

				if(err){
					console.log(err);
				}
				else{
					req.session.address = address;
				}	
			});

			console.log(req.session.address); 
		}

		res.render('checkout2',{user:req.user});

	})

	app.get('/home/checkout3',function(req,res){

		res.render('checkout3',{user:req.user});

	})

/*	app.get('/home/product/buynow',function(req,res){

		new Order({
			user_id:ObjectId(req.user._id),
			date: new Date(),
			status: "pendding"
		}).save(function(err,order){
			if(err){
				consolee.log(err)
			}
			else{

				new OrderDetails({

					order_id:order._id,
					toy_id:ObjectId(req.query.id),
					Seller_id:1111,
					address_id:ObjectId(req.user.address),
					quantity:1,
					discount:00,
					total:00,
					bill_date:new Date(),
					ship_date:new Date(),
					status:'pendding',
					tax:00

				}).save();


			}
		});	

		res.render('MyOrder',{user:req.user});

	})*/


}