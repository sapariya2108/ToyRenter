
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var passportSetup = require('./config/passport-setup');
var cookieSession = require('cookie-session');
var passport = require('passport');
var app = new express();

// Setup a templete Engine 
// We use a HandleBar.js for template Engine 
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs');
app.use(express.static('./views'));


app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: ["toyRenter"]
}));

app.use(passport.initialize());
app.use(passport.session());


//Routes Decaler and Calling 
var homeRoute = require('./Routes/homeRoute');
homeRoute(app);

var toyRoute = require('./Routes/toyRoute');
toyRoute(app);

var authRoute = require('./Routes/authRoute');
authRoute(app);

var cartRoute = require('./Routes/cartRoute');
cartRoute(app);

var profileRoute = require('./Routes/profileRoute');
profileRoute(app);

var myorderRoute = require('./Routes/myorderRoute');
myorderRoute(app);

var buynowRoute = require('./Routes/buynowRoute');
buynowRoute(app);


module.exports = app;