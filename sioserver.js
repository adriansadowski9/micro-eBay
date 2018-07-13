//jshint node: true, esversion: 6
module.exports = (io,Auction,ObjectId,Chat) => {
    io.on('connect', (socket) => {

        var newMessages = 0;
        
        socket.on('bid',(auctionId) => {
            setTimeout(function(){
            Auction.findOne({_id:ObjectId(auctionId)}, function (err, auctionRefresh) {
            socket.broadcast.emit('refreshPrice',auctionRefresh);
            });
            }, 2000);
        });

        socket.on('newMessage',(conversationId,userName,message) => {
            Chat.findOne({_id:ObjectId(conversationId)}, function (err, newMessage) {
                if(newMessage){
                    Chat.updateOne({_id:ObjectId(conversationId)},{$addToSet:{messages:[{username:userName,message:message}]},$set:{lastUser:userName,read:false}},function (err, messageAdded) {
                        if(messageAdded){
                            socket.broadcast.emit('newMessage',conversationId,userName,message);
                        }
                        else{
                            console.log(err);
                        }
                    });
                }
            });
        });
        
        socket.on('messageReceived',(conversationId,userName) => {
            Chat.update({_id:ObjectId(conversationId)},{$set:{read:true}},function (err, messageReceived) {
                if(err){
                    console.log(err);
                }
            });            
        });

        socket.on('checkNewMessages',(userName) => {
            newMessages = 0;
            Chat.find({$and:[{$or:[{user1:userName},{user2:userName}]},{read:false}]},function (err, found) {
                if(err){
                    console.log(err);
                }
                else{
                    found.forEach(function (element){
                        if(element.lastUser!=userName){
                            newMessages =+ 1;
                        }
                    });
                    if(newMessages>0)
                    socket.emit('newMessageReceived',userName);
                }
            });     
        }); 
    
        socket.on('error', (err) => {
            console.dir(err);
        });
    });
};