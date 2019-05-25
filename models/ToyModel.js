var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected Succesfully");
});

var Schema = mongoose.Schema;

var toySchema = new Schema({

	toy_name: {
		type:String,
		required:true
	},
	toy_title: {
		type:String,
		required:true
	},
	toy_descripation:{
		type:[String],
		required:true
	},
	toy_categories:{
		type:String,
		required:true
	},
	age_from: {
		type:Number, 
		min:0,
		max:14
	},
	age_to:{
		type:Number,
		min:1 ,
		max:14
	},
	toy_color:{
		type:[String],
		required:true
	},
	toy_material:{
		type:String,
		required:true
	},
	toy_price:{
		type:Number,
		required:true
	},
	toy_brand:{
		type:String,
		required:true
	},
	toy_image:{
		type:[String],
		required:true
	}
});


var Toy = mongoose.model('Toy',toySchema);
/*
var horse = new Toy({

	toy_name: "Trinkets & More",
	toy_title: "Animal Croquet Game Set Gate Ball | Mini Golf Set | Pretend Play Toys for Kids and Preschoolers 3+ Years (Random Colours)",
	toy_descripation:["This wooden animal croquet game set encourages children to engage in active play and outdoor exercise. Perfect for Indoor swell as Outdoor play",
						"It develops concentration, strategy, physical strength, hand-eye coordination and good sportsmanship",
						"Painted in bright colours and vivid cute animal patterns. Can be easily stored and carried during travel or outdoor activities. Superb bonding game to play with your children, just like playing golf together",
						"Including 4 animal goals, shaped as elephant, lion, giraffe and 2 mallets along with 2 coloured golfballs. It can be taken apart easily and super easy to assemble again",
						"Made with wood sourced from environmentally sustainable forests. Durable child safe paint finish and solid wood construction make this a toy your child will love for years to come"],
	toy_categories:"animal",
	age_from: 3,
	age_to:4,
	toy_color: ["Multi"],
	toy_material:"Wood",
	toy_price:999.00,
	toy_brand: "Trinkets & More",
	toy_image:["http://localhost:3000/images/New folder/Trinkets & More_1.jpg",
				"http://localhost:3000/images/New folder/Trinkets & More_2.jpg",
				"http://localhost:3000/images/New folder/Trinkets & More_3.jpg",
				"http://localhost:3000/images/New folder/Trinkets & More_4.jpg",
				"http://localhost:3000/images/New folder/Trinkets & More_5.jpg",
				"http://localhost:3000/images/New folder/Trinkets & More_5.jpg"]

});

horse.save(function(err){
	if(err) console.log(err);

	console.log("Inserted Sucessfully.");
});
*/

module.exports = Toy;
