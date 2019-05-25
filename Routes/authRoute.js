const express = require('express');
const passport = require('passport');

const app = new express();


module.exports = function(app){


	app.get('/auth/google',passport.authenticate('google',{

		scope: ['profile','email']
	
	}));

	app.get('/auth/google/redirect',passport.authenticate('google'),function(req,res)
	{ 
		if(req.session.product_id){

			console.log(req.session.product_id);
			var url = "/home/product?id="+req.session.product_id;
			req.session.product_id = null;
			res.redirect(url);
		
		}else if(req.session.category){

			console.log(req.session.category);
			var url = "/home/"+req.session.category;
			req.session.category = null;
			res.redirect(url);
		}
		else{

			res.redirect('/home');
		
		}
	});

	app.get('/auth/facebook',passport.authenticate('facebook',
			{scope:'email'}
			)
	);

	app.get('/auth/facebook/callback',passport.authenticate('facebook',
	{ 
		successRedirect:'/home',
		failureRedirect:'/auth/facebook'
	}));

	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/home');
	})	

	app.get('/auth/google/product',function(req,res,next){

		req.session.product_id = req.query.id;
		next();

	},passport.authenticate('google',{

		scope: ['profile']
	
	}));

	app.get('/auth/google/category',function(req,res,next){

		req.session.category = req.query.category;
		next();

	},passport.authenticate('google',{

		scope: ['profile']
	
	}));

}