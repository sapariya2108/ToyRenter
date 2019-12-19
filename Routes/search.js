var express = require('express');
var mongoose = require('mongoose');
var toy = require('../models/ToyModel');
const {ObjectId} = require('mongodb');
const db = require('../server');


module.exports = function(app){


	app.get('/search',function(req,res){
		
		toy.find({
			"$or":[{"toy_name": new RegExp(req.query.search, 'i')},
			{"toy_title": new RegExp(req.query.search, 'i')},
			{"toy_descripation": new RegExp(req.query.search, 'i')}]
		},function(err,toy){
			if(err){
				console.log("Error");
			}
			console.log("Done");
			console.log(toy);
			var data = "<div id="+"search_result"+">";
				for(var i=0;i<toy.length;i++){
					data = data + "<a href="+"/show_search_item?search_item="+toy[i].toy_name+"><li class="+"list-group-item"+" style="+"color:black"+">"+toy[i].toy_name+"</li></a>"; 
					// toy[i].user = req.user;
				}
				data = data + "</div>";
				console.log(data);

				res.send(data);
		});
	});

	app.get('/show_search_item',function(req,res){

		toy.find({
			$text: {
				$search: req.query.search_item
			}
		}, {
		} ,function(err,toy){
			if(err){
				console.log("Error");
			}
			console.log("Done");
			var data = "";
				for(var i=0;i<toy.length;i++){
					toy[i].user = req.user;
				}
				console.log(toy);

				res.render('Category',{user:req.user,title:req.query.search_item,toy:toy,cartUser:req.user});
		});
	});
}