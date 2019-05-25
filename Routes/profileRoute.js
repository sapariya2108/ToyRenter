const express = require('express');
const User = require('../models/UserModel');
const Address = require('../models/AddressModel');
const {ObjectId} = require('mongodb');

const app = new express();

module.exports = function(app){

	app.get('/home/account',function(req,res){

		if(req.user.address){
		Address.findOne({_id:req.user.address},function(err,add){

				res.render('Profile',{user:req.user,address:add})	
		})
		}
		else{
					res.render('Profile',{user:req.user});			
		}
	})


	app.get('/home/account/save',function(req,res){

			console.log(req.query.mobile);
		var user = {

			name:req.query.firstname,
			email:req.query.email,
			mobile:parseInt(req.query.mobile)

		};
		var address = {

			home_no:req.query.home_no,
			street:req.query.street,
			city:req.query.city,
			state:req.query.state,
			country:req.query.country,
			pincode:req.query.pincode

		};

		if(req.user.address){

		var query = {_id:ObjectId(req.user.address)} ;

		Address.findOneAndUpdate(query,{$set:address},{new:true},function(err){

			if(err){ 
				console.log(err);
			}
			else{
			console.log("Update Successfully");
			}
		})

		}
		else{

			new Address(address).save(function(err,add){
				if(err){
					console.log(err);
				}
				else{
					User.findOneAndUpdate({_id:req.user._id},{$set:{address:add}},{new:false},function(err){
									if(err){ 
											console.log(err);
									}
									else{
											console.log("Update Successfully");
									}				
					})
					req.user.address = add;
				}
			})

		}

		User.findOneAndUpdate({_id:req.user._id},user,{new:false},function(err){
			
			if(err){ 
				console.log(err);
			}
			else{
			console.log(" User Update Successfully");
			}	
		})
		res.redirect('/home/account');
	})
};