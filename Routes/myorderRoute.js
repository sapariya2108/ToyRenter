const express = require('express');
const mongoose = require('mongoose');
const order = require('../models/OrderModel');
const orderDetails = require('../models/OrderDetailsModel');

const app = new express();


module.exports = function(app){


	app.get('/home/myorder',function(req,res){

		res.render('MyOrder',{user:req.user});

	})

}