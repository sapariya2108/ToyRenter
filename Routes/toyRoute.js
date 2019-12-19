var express = require('express');
var mongoose = require('mongoose');
var toy = require('../models/ToyModel');
const {ObjectId} = require('mongodb');
const db = require('../server');


module.exports = function(app){


	app.get('/home/product',function(req,res){

		toy.find({_id:ObjectId(req.query.id)},function(err,toy){
			if(err) console.log("Error",err);
			
			var productUrl = {
				url:"/home/product?id="+toy[0]._id
			}


			console.log(productUrl.url);
			res.render('Product',{toy:toy,user:req.user,productUrl:productUrl});	
		});
	});

	app.get('/home/animal',function(req,res){

		toy.find({toy_categories:"animal"},function(err,toy){

				toy.user = req.user;
				for(var i=0;i<toy.length;i++){

					toy[i].user = req.user;
				}
				res.render('Category',{user:req.user,title:"Animal",toy:toy,cartUser:req.user});
	
		});
	});

}