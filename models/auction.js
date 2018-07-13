//jshint node: true, esversion: 6
var mongoose = require('mongoose');

// Auction Schema
var AuctionSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	description: {
		type: String
	},
	price: {
		type: String
  	},
  	listedType: {
		type: String
	},
	created: {
		type: String
  	},
  	listedTime: {
		type: String
  	},
  	end: {
		type: String
  	},
  	ownerId: {
		type: String
	},
  	buyerId: {
		type: String
	},
	listed:{
		type: Boolean
	},
  	ended: {
		type: Boolean
	},
	allBidders: { 
		type: [mongoose.Schema.Types.ObjectId]
	},
	photo: {
		type: String
	}
});

var Auction = module.exports = mongoose.model('Auction', AuctionSchema);

module.exports.createAuction = function(newAuction, callback){
	        newAuction.save(callback);
};
