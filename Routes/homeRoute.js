var express = require('express');
var mongoose = require('mongoose');
var toy = require('../models/ToyModel');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

module.exports = function(app){


	app.get('/home',async function(req,res){

		var animal_toy = await toy.find({toy_categories:"animal"});
		//console.log(animal_toy);

		var artandcraft_toy = await toy.find({toy_categories:"art and craft"});
		//console.log(artandcraft_toy);

		var construction_toy = await toy.find({toy_categories:"construction"});
		//console.log(construction_toy);

		res.render('Home1',{user:req.user,animal_toy:animal_toy,artandcraft_toy:artandcraft_toy,construction_toy:construction_toy});
	});

};