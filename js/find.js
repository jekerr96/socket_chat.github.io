$(document).ready(function(){
	var search = firebase.database().ref("search/");
	var table = $("#list_find");
	var audio = new Audio();
	audio.src = "sound/new_find.mp3";
	search.on("child_added", function(data){
		audio.load();
		audio.play();
		var token = data.val().token;
		var name = data.val().myname;
		var pol = data.val().aboutme[0];
		var age = data.val().aboutme[1];
		var opponentPol = data.val().aboutopponent[0];
		var opponentAge = data.val().aboutopponent[1];

		switch(pol){
			case "1": pol = "Мужской"; break;
			case "2": pol = "Женский"; break;
		}

		switch(age){
			case "1": age = "До 18"; break;
			case "2": age = "18-21"; break;
			case "3": age = "22-26"; break;
			case "4": age = "27-35"; break;
			case "5": age = "36+"; break;
		}

		switch(opponentPol){
			case "0": opponentPol = "Любой"; break;
			case "1": opponentPol = "Мужской"; break;
			case "2": opponentPol = "Женский"; break;
		}

		switch(opponentAge){
			case "0": opponenAge = "Любой"; break;
			case "1": opponenAge = "До 18"; break;
			case "2": opponenAge = "18-21"; break;
			case "3": opponenAge = "22-26"; break;
			case "4": opponenAge = "27-35"; break;
			case "5": opponenAge = "36+"; break;
		}

		$(table).append("<tr id='" + token + "'><td>" + name + "</td><td>" + pol + "</td><td>" + age + "</td><td>" + opponentPol + "</td><td>" + opponenAge + "</td></tr>");
		
	});
	search2 = search;
	search2.on("child_removed", function(data){
		var token = data.val().token;
		$("#" + token).detach();
	})
});