const mongoose = require('mongoose');
const http = require('http');
const toy = require('./models/ToyModel');


const MONGODB = 'mongodb://Harsh:harsh@toyrenter-shard-00-00-hhprd.mongodb.net:27017,toyrenter-shard-00-01-hhprd.mongodb.net:27017,toyrenter-shard-00-02-hhprd.mongodb.net:27017/test?ssl=true&replicaSet=toyrenter-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;
	
mongoose.connect(MONGODB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
	const app = require('./app')

	app.set('port', PORT);
    server = http.createServer(app);
    server.listen(app.get('port'));
	console.log("Connected Succesfully on Port :"+app.get('port'));
});

module.exports = db;