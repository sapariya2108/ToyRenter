const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/UserModel');
const FacebookStrategy = require('passport-facebook');

passport.serializeUser((user,done)=>{
	console.log("serializeUser");
	return done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	console.log("deserializeUser");
	User.findById(id).then((user)=>{
		 return done(null,user);
	});
});

passport.use(
	new GoogleStrategy({

		callbackURL: "/auth/google/redirect",
		clientID: "828867240540-c1h6iclul6djtjpn65kd63981n2638e1.apps.googleusercontent.com",
		clientSecret: "aeGd4M-OFgiyCrbZ0nR1Itcu"
	
	},(accessToken, refreshToken, profile, done) =>{


		User.findOne({google_id:profile.id},(err,user)=>{

			if(err) console.log(err);
			if(user){

				console.log("Already Login");
				return done(null,user);
			}
			else{
				console.log(profile);
				new User({
					name:profile.displayName,
					email:profile.emails[0].value,
					photo:profile.photos[0].value,
					google_id:profile.id
				}).save().then((user)=>{

					console.log("Inserted Sucessfullly.");
					return done(null,user);
				});
			}
			});
	})
)

passport.use(
	new FacebookStrategy({

		callbackURL: "/auth/facebook/callback",
		clientID: "1246674498841217",
		clientSecret: "f04fa8f406bd0283d513c1fd5e9549b4",
		profileFields: ['id','displayName' ,'emails','picture.type(large)']
	
	},(accessToken, refreshToken, profile, done) =>{


		User.findOne({google_id:profile.id},(err,user)=>{

			if(err) console.log(err);
			if(user){

				console.log("Already Login");
				return done(null,user);
			}
			else{
				console.log(profile);
				new User({
					name:profile.displayName,
					email:profile.emails,
					photo:profile.photos[0].value,
					facebook_id:profile.id
				}).save().then((user)=>{

					console.log("Inserted Sucessfullly.");
					return done(null,user);
				});
			}
			});
	})
)

