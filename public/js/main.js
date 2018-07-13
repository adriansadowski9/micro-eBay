//jshint node: true, esversion: 6
require('../hbs/layouts/layout.hbs');

//jquery here
$(() => {
$("#auctionPhoto").click(function(){		                                       
    $("#auctionPhotoBig").attr("src",$("#auctionPhoto").attr("src"));
    $("#overlay").show();
    $("#overlayContent").show();
});

$("#auctionPhotoBig").click(function(){
    $("#auctionPhotoBig").attr("src", "");
    $("#overlay").hide();
    $("#overlayContent").hide();
});
let skip = 6;
$('#paginationButton').on('click', () => {
    loadMore(skip);
    skip += 3;
  });
const loadMore = (skip) => {
    $.ajax({
      url: "/auctions/pagination",
      type: "GET",
      data: {skip},
      complete: loadNewElements
    });
  };
  const loadAuction = (elem) => {
    let auction = `<div class="card" >
                        <div class="card-body">
                            <h4 class="card-title">${elem.name}</h4>
                            <p class="card-text">${elem.description}</p>
                            <p class="card-text">Price: ${elem.price}</p>
                            <a href="/auction/${elem._id}" class="btn btn-primary">Go to auction</a>
                        </div>
                    </div>`;
    return auction;
  };
const loadNewElements = (json) => {
    var done = 0;
    var code = '';
    if (json.status === 200) {
      let {auctions} = json.responseJSON;
      if(auctions.length === 0){
        $('#paginationButton').attr('disabled', true);
        $('#paginationButton').text('No more auctions!');
      }
      code = `<div class="card-deck" style="margin-top:20px;">`;
      auctions.forEach(function(elem) {
          code = code + loadAuction(elem);
          done = done + 1;
      });
      code = code + `</div>`;
      if(done > 0){
        $('#listOfAuctions').append(code);
      }
    }
  };

  let skipMyAuctions = 3;
  $('#paginationButtonMyAuctions').on('click', () => {
    loadMoreMyAuctions(skipMyAuctions);
    skipMyAuctions += 3;
  });

  const loadMoreMyAuctions = (skipMyAuctions) => {
    $.ajax({
      url: "/profile/myauctionspag/",
      type: "GET",
      data: {skipMyAuctions},
      complete: loadNewElementsMyAuctions
    });
  };
  const loadAuctionMyAuctions = (elem) => {
    let auction = `<div class="card" >
                        <div class="card-body">
                            <h4 class="card-title">${elem.name}</h4>
                            <p class="card-text">Price: ${elem.price}</p>
                            <a href="/auction/${elem._id}" class="btn btn-primary">Go to auction</a> <a href="/editauction/${elem._id}" class="btn btn-warning">Edit auction</a>
                        </div>
                    </div>`;
    return auction;
  };
const loadNewElementsMyAuctions = (json) => {
    var done = 0;
    var code = '';
    if (json.status === 200) {
      let {myAuctions} = json.responseJSON;
      if(myAuctions.length === 0){
        $('#paginationButtonMyAuctions').attr('disabled', true);
        $('#paginationButtonMyAuctions').text('No more auctions!');
      }
      code = `<div class="card-deck" style="margin-top:20px;">`;
      myAuctions.forEach(function(elem) {
          code = code + loadAuctionMyAuctions(elem);
          done = done + 1;
      });
      code = code + `</div>`;
      if(done > 0){
        $('#listOfMyAuctions').append(code);
      }
    }
  };

  let skipWonAuctions = 3;
  $('#paginationButtonWonAuctions').on('click', () => {
    loadMoreWonAuctions(skipWonAuctions);
    skipWonAuctions += 3;
  });

  const loadMoreWonAuctions = (skipWonAuctions) => {
    $.ajax({
      url: "/profile/wonauctionspag/",
      type: "GET",
      data: {skipWonAuctions},
      complete: loadNewElementsWonAuctions
    });
  };
  const loadAuctionWonAuctions = (elem) => {
    let auction = `<div class="card" >
                        <div class="card-body">
                            <h4 class="card-title">${elem.name}</h4>
                            <p class="card-text">Price: ${elem.price}</p>
                            <a href="/auction/${elem._id}" class="btn btn-primary">Go to auction</a> <a href="/editauction/${elem._id}" class="btn btn-warning">Edit auction</a>
                        </div>
                    </div>`;
    return auction;
  };
const loadNewElementsWonAuctions = (json) => {
    var done = 0;
    var code = '';
    if (json.status === 200) {
      let {wonAuctions} = json.responseJSON;
      if(wonAuctions.length === 0){
        $('#paginationButtonWonAuctions').attr('disabled', true);
        $('#paginationButtonWonAuctions').text('No more auctions!');
      }
      code = `<div class="card-deck" style="margin-top:20px;">`;
      wonAuctions.forEach(function(elem) {
          code = code + loadAuctionWonAuctions(elem);
          done = done + 1;
      });
      code = code + `</div>`;
      if(done > 0){
        $('#listOfWonAuctions').append(code);
      }
    }
  };

  let skipEndedAuctions = 3;
  $('#paginationButtonEndedAuctions').on('click', () => {
    loadMoreEndedAuctions(skipEndedAuctions);
    skipEndedAuctions += 3;
  });

  const loadMoreEndedAuctions = (skipEndedAuctions) => {
    $.ajax({
      url: "/profile/endedauctionspag/",
      type: "GET",
      data: {skipEndedAuctions},
      complete: loadNewElementsEndedAuctions
    });
  };
  const loadAuctionEndedAuctions = (elem) => {
    let auction = `<div class="card" >
                        <div class="card-body">
                            <h4 class="card-title">${elem.name}</h4>
                            <p class="card-text">Price: ${elem.price}</p>
                            <a href="/auction/${elem._id}" class="btn btn-primary">Go to auction</a> <a href="/editauction/${elem._id}" class="btn btn-warning">Edit auction</a>
                        </div>
                    </div>`;
    return auction;
  };
const loadNewElementsEndedAuctions = (json) => {
    var done = 0;
    var code = '';
    if (json.status === 200) {
      let {endedAuctions} = json.responseJSON;
      if(endedAuctions.length === 0){
        $('#paginationButtonEndedAuctions').attr('disabled', true);
        $('#paginationButtonEndedAuctions').text('No more auctions!');
      }
      code = `<div class="card-deck" style="margin-top:20px;">`;
      endedAuctions.forEach(function(elem) {
          code = code + loadAuctionEndedAuctions(elem);
          done = done + 1;
      });
      code = code + `</div>`;
      if(done > 0){
        $('#listOfEndedAuctions').append(code);
      }
    }
  };

  let skipUserAuctions = 3;
  let userLogin;
  $('#paginationButtonUserAuctions').on('click', () => {
    userLogin = $('#userLogin').text();
    loadMoreUserAuctions(skipUserAuctions);
    skipUserAuctions += 3;
  });

  const loadMoreUserAuctions = (skipUserAuctions) => {
    $.ajax({
      url: "/user/"+userLogin+"/userauctionspag/",
      type: "GET",
      data: {skipUserAuctions},
      complete: loadNewElementsUserAuctions
    });
  };
  const loadAuctionUserAuctions = (elem) => {
    let auction = `<div class="card" >
                        <div class="card-body">
                            <h4 class="card-title">${elem.name}</h4>
                            <p class="card-text">Price: ${elem.price}</p>
                            <a href="/auction/${elem._id}" class="btn btn-primary">Go to auction</a> <a href="/editauction/${elem._id}" class="btn btn-warning">Edit auction</a>
                        </div>
                    </div>`;
    return auction;
  };
const loadNewElementsUserAuctions = (json) => {
    var done = 0;
    var code = '';
    if (json.status === 200) {
      let {userAuctions} = json.responseJSON;
      if(userAuctions.length === 0){
        $('#paginationButtonUserAuctions').attr('disabled', true);
        $('#paginationButtonUserAuctions').text('No more auctions!');
      }
      code = `<div class="card-deck" style="margin-top:20px;">`;
      userAuctions.forEach(function(elem) {
          code = code + loadAuctionUserAuctions(elem);
          done = done + 1;
      });
      code = code + `</div>`;
      if(done > 0){
        $('#listOfUserAuctions').append(code);
      }
    }
  };

});