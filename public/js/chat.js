//jshint node: true, esversion: 6, jquery:true
$(() => {
    let socket = io();

    socket.on('connect', () => {
        $('#messagesRow ul').scrollTop($('#messagesRow ul').height()+15000000000);
        var message,userName,conversationId;
        userName = $("#userLogin").text();
        socket.emit('checkNewMessages',userName);
        setInterval(function(){ socket.emit('checkNewMessages',userName); }, 10000);
        $("#message").keypress(function(e){
            if(e.key === 'Enter'){
                message = $("#message").val();
                conversationId = $("#conversationId").text();
                $("#message").val('');
                socket.emit('newMessage',conversationId,userName,message);
                $("#messagesRow ul").append("<li>"+userName+": "+message+"</li>");
                $('#messagesRow ul').scrollTop($('#messagesRow ul').height()+15000000000);
            }
        });
        $("#sendMessage").click(function(){
            message = $("#message").val();
            conversationId = $("#conversationId").text();
            $("#message").val('');
            socket.emit('newMessage',conversationId,userName,message);
            $("#messagesRow ul").append("<li>"+userName+": "+message+"</li>");
            $('#messagesRow ul').scrollTop($('#messagesRow ul').height()+15000000000);
        });
        socket.on('newMessage',(rConversationId,rUserName,rMessage) => {
            conversationId = $("#conversationId").text();
            if(conversationId === rConversationId){
                $("#messagesRow ul").append("<li>"+rUserName+": "+rMessage+"</li>");
                $('#messagesRow ul').scrollTop($('#messagesRow ul').height()+15000000000);
                if(userName!=rUserName){
                    console.log("weszlo");
                    socket.emit('messageReceived',conversationId,rUserName);
                }
            }
        });
        socket.on('newMessageReceived',(userName) => {
            $("#messagesMenu").text('New message received');
            console.log('done');
        });
    });
});
