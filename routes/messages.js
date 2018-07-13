//jshint node: true, esversion: 6, jquery:true
const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var Handlebars = require('handlebars');
let Chat = require('../models/chat.js');
let User = require('../models/user.js');

var isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
	  	return next();
	} else {
	  	res.redirect('/login');
	}
};

router.get('/chat', isAuthenticated, (req, res) => {
    Chat.find({$or:[ {user1:req.user.username}, {user2:req.user.username}]},function (err, chats) {
		if (chats) {
				chats.forEach(function(conversation){
					conversation.loggedUser = req.user.username;
				});
				res.render('chat', {chats: chats});
		}
		else {
			res.render('error',{ status: 404, url: req.url });
		}	
	});
});

router.get('/chat/:user1/:user2', isAuthenticated, (req, res) => {
if(req.params.user1 != req.params.user2){
	if((req.params.user1 === req.user.username)||(req.params.user2 === req.user.username)){
		Chat.findOne({$or:[ {$and:[{user1:req.params.user1}, {user2:req.params.user2}]},{$and:[{user1:req.params.user2}, {user2:req.params.user1}]}]},function (err, messages) {
			if (messages) {
				if(((req.params.user1 === req.user.username) || (req.params.user2 === req.user.username)) && ((messages.lastUser!=req.user.username) && (messages.read === false))){
					Chat.update({_id:ObjectId(messages._id)},{$set:{read:true}},function (err, messageReceived) {
						if(err){
							console.log(err);
						}
					});
				}
				res.render('privateMessages', {messages: messages});
			}
			else {
				User.findOne({username:req.params.user1},function (err, user1) {
					if(user1){
						User.findOne({username:req.params.user2},function (err, user2) {
							if(user2){
								var newConversation = new Chat({
									user1: user1.username,
									user2: user2.username,
									messages:[],
									lastUser:"",
									read: true
								});
								Chat.createConversation(newConversation, function (err, newConv) {
									if (err) throw err;
									else{
										Chat.findOne({$or:[ {$and:[{user1:user1.username}, {user2:user2.username}]},{$and:[{user1:user2.username}, {user2:user1.username}]}]},function (err, messagesAgain) {
											if(messagesAgain){
												res.render('privateMessages', {messages: messagesAgain});
											}
											else{
												res.render('error',{ status: 404, url: req.url });
											}
										});
									}
								});
						
							}
							else{
								res.render('error',{ status: 404, url: req.url });
							}
						});	
					}
					else{
						res.render('error',{ status: 404, url: req.url });
					}
				});	
			}
		});
	}
	else{
		res.render('error',{ status: 404, url: req.url });
	}
}
else{
	res.render('error',{ status: 404, url: req.url });
}
});

Handlebars.registerHelper('newMessages', function(loggedUser,lastUser, read) {
    if((loggedUser!=lastUser)&&(read===false)){
		return " - new message";
	}
});

module.exports = router;