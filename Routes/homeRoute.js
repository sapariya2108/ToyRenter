var express = require('express');
var mongoose = require('mongoose');
var toy = require('../models/ToyModel');
const db = require('../server');

module.exports = function(app){


	app.get('/',async function(req,res){

		var animal_toy = await toy.find({toy_categories:"animal"});
		//console.log(animal_toy);

		var artandcraft_toy = await toy.find({toy_categories:"artandcraft"});
		//console.log(artandcraft_toy);

		var construction_toy = await toy.find({toy_categories:"construction"});
		//console.log(construction_toy);

		res.render('Home1',{user:req.user,animal_toy:animal_toy,artandcraft_toy:artandcraft_toy,construction_toy:construction_toy});
	});

};