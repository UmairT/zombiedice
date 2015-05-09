var socket,
	brains = 0,
	shotguns = 0,    
	feets = 0,
	data;

var main = function() {
	"use strict";
	
	socket = io('http://localhost:3000/ingame');

	$('#roll').click(function(){
    	data = roll();
    });

	$('#stop').click(function(){
       stop();
    });
	
	//Login
	$("#lobbyreturn").click(function() {
		$(location).attr('href', "/lobby");
	});
	
	socket.on('handshake', function(sid, username, ret) {
		console.log("handshake received from " + sid);
		$("#opponentid").val(sid);
		$("#opponentname").empty();
		$("#opponentname").append(username);
		if (ret === 0) {
			socket.emit("return handshake", sid);
		}
	});

	$("div.dice1").text("Rolling...");
    $("div.dice2").text("Rolling...");
    $("div.dice3").text("Rolling...");

    setInterval(function () {
        $("div.dice1").html("<image src='images/brain_roll.jpg'>");
        $("div.dice1_label").html("BRAIN");
    }, 1000);
    
    setInterval(function () {
        $("div.dice2").html("<image src='images/shotgun_roll.jpg'>");
        $("div.dice2_label").html("SHOTGUN");
    }, 2000);
    
    setInterval(function () {
        $("div.dice3").html("<image src='images/foot_roll.jpg'>");
        $("div.dice3_label").html("FEET");
    }, 3000);

    $("div.turn").text("Turn: Umair");
    
    //$("div.brains").text("Brains: ");
    $("div.brains").html(data[0]);
      
    //$("div.shotguns").text("Shotguns: ");
    $("div.shotguns").html(data[1]);
    
    //$("div.feets").text("Feets: ");
    $("div.feets").html(data[2]);
}

$(document).ready(main);

function roll () {

    var	diceArray = ["brain", "shotgun", "feet"];
    var dice1 = diceArray[Math.floor(Math.random() * diceArray.length)];
    var dice2 = diceArray[Math.floor(Math.random() * diceArray.length)];
	var dice3 = diceArray[Math.floor(Math.random() * diceArray.length)];
    
    if (dice1 === "brain") {
    	brains = brains + 1;
    } else if (dice1 === "shotgun") {
    	shotguns = shotguns + 1;
    } else {
    	feets = feets + 1;
    }
    
    if (dice2 === "brain") {
    	brains = brains + 1;
    } else if (dice2 === "shotgun") {
    	shotguns = shotguns + 1;
    } else {
    	feets = feets + 1;
    }
    
    if (dice3 === "brain") {
    	brains = brains + 1;
    } else if (dice3 === "shotgun") {
    	shotguns = shotguns + 1;
    } else {
    	feets = feets + 1;
    }
    
    return[brains, shotguns, feets];
};

function stop () {
	socket.on('stop', function(sid, username, ret) {
		
		var brains = 5;
		$("div.brains").text("Brains: " + brains);

		if (ret === 0) {
			socket.emit("stop and score", sid, brains);
		}
	});
};