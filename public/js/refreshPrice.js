//jshint node: true, esversion: 6, jquery:true
$(() => {
    let socket = io();

    socket.on('connect', () => {
        $(".bidButton").click(function(){
            var id = $(this).attr("value");
            socket.emit('bid',id);
        });
        socket.on('refreshPrice', (auction) => {
            var id = $("#bidButton").attr("value");
            var idMyBids = $("#"+auction._id).attr("id");
            if(auction._id === id){
                $("#price").each(function () {
                    $(this).text(auction.price);
                });
                if($("#loggedUserId").text() == auction.buyerId){
                    $("#"+auction._id).text("You are a leader");
                }
                else{
                    $("#"+auction._id).text("Someone made a higher offer");
                }
            }
            if(auction._id === idMyBids){
                $("#price-"+auction._id).text("Price: "+auction.price);
                if($("#loggedUserId").text() == auction.buyerId){
                    $("#leader-"+auction._id).text("You are a leader");
                }
                else{
                    $("#leader-"+auction._id).text("Someone made a higher offer");
                }
            }
        });
    });
});
