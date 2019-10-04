const mongoose = require('mongoose');
const http = require('http');


const MONGODB = 'mongodb+srv://Harsh:<password>@toyrenter-hhprd.mongodb.net/admin?retryWrites=true&w=majority/test;
const PORT = process.env.PORT || 3000;
	
mongoose.connect(MONGODB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
	const app = require('./app')

	app.set('port', PORT);
    server = http.createServer(app);
    server.listen(app.get('port'));
	console.log("Connected Succesfully");
});

module.exports = db;