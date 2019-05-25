var express = require('express');
var mongoose = require('mongoose');
var toy = require('../models/ToyModel');
const {ObjectId} = require('mongodb');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

module.exports = function(app){


	app.get('/home/product',function(req,res){

		toy.find({_id:ObjectId(req.query.id)},function(err,toy){
			if(err) console.log("Error",err);
			
			var productUrl = {
				url:"https://localhost:3000/home/product?id="+toy[0]._id
			}


			console.log(productUrl.url);
			res.render('Product',{toy:toy,user:req.user,productUrl:productUrl});	
		});
	});

	app.get('/home/animal',function(req,res){

		toy.find({toy_categories:"animal"},function(err,toy){

				console.log("Animal Entry");
				console.log(req.user);
				toy.user = req.user;
				for(var i=0;i<toy.length;i++){

					toy[i].user = req.user;
				}
				console.log(toy);
				res.render('Category',{user:req.user,title:"Animal",toy:toy,cartUser:req.user});
	
		});
	});

}