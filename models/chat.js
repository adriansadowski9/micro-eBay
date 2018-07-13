//jshint node: true, esversion: 6
var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
  user1: {
    type: String
  },
  user2: {
    type: String
  },
  messages: {
    type: [
      {
        username: String,
        message: String,
      }
    ]
  },
  lastUser: String,
  read: Boolean
});

var Chat = module.exports = mongoose.model('Chat', ChatSchema);

module.exports.createConversation = function(newConversation, callback){
  newConversation.save(callback);
};