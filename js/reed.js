$(document).ready(function(){
	var token = "";
	var msgRef = firebase.database().ref("messages");
	var msgR = firebase.database().ref("messages/" + token);
	var select = $("#list-messages");
	var myAuthor = 0;
	var audio = new Audio();
	var name = "Хост";
	var opponentName = "Подключившийся";
	audio.src = "sound/new_message.mp3";

	msgRef.on("child_added", function(data){
		$(select).append("<option value='" + data.key + "'>" + data.key + "</option>");
	});

	$(select).change(function(){
		token = $(this).val();
		$(".chat").html("");
		msgR.off();
		msgR = firebase.database().ref("messages/" + token);
		msgR.on("child_added", function(data){

			var msg = data.val().msg;
			var author = data.val().author;
			var classmsg;
			if(author == myAuthor){
					classmsg = "my-message";
					msgName = name;
				}
				else{
					classmsg = "opponent-message";
					msgName = opponentName;
				}

			if(msg == "ijk^%$%234qe" && author != myAuthor){
				msg = "<div class='block-mess-write'>" + msgName + " печатает</div>";
				$(".chat").append(msg);
				var block = document.getElementById("chat");
				block.scrollTop = block.scrollHeight;
				return;
			}
			else if(msg == "sdfgfhg$#%$df" && author != myAuthor){
				$(".block-mess-write").detach();
				return;
			}

			else if(msg != "" && msg != "%$&wgb$5sfgeq#67$235" && msg != "ijk^%$%234qe" && msg != "sdfgfhg$#%$df"){

				

				msg = "<div class='block-mess'><span class='my-login'>" + msgName + ": </span><span class=" + classmsg + ">" + msg + "</span></div>";
				var block_mess_write = $(".block-mess-write");
				if(block_mess_write.html() != null){
					$(msg).insertBefore(block_mess_write);
				}
				else {
					$(".chat").append(msg);
				}
				
						var block = document.getElementById("chat");
						block.scrollTop = block.scrollHeight;
						audio.play();
			}
			else if(msg == "%$&wgb$5sfgeq#67$235" && author != myAuthor){
				$(".block-mess-write").detach();
					$(".chat").append("<br>Собеседник покинул чат");	
					audio.play();
			}
				
			});
	
	});
});