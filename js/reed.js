$(document).ready(function(){
	var socket = io('//socketchat-xbimbdzizu.now.sh');
	var my_auhor = 0;
	var name = "Аноним1";
	var opponentName = "Аноним2";
	var roomName = "";
	var audio = new Audio();
	audio.src = "sound/new_message.mp3";
	audio.load();

	socket.on("get_rooms", function(data){
		$(".select_rooms").append("<option value='" + data.room + "'>" + data.room + "</option>");
	});

	socket.on("get_messages", update_Chat);

	var update_Chat = function Update_Chat(data){
		var msg = data.msg;
		var author = data.author;
		var unreedClass = "";
		if(!reedMsg && author == myAuthor) unreedClass = "unreed";
		if(author == myAuthor){
				classmsg = "my-message";
				msgName = name;
			}
			else{
				classmsg = "opponent-message";
				msgName = opponentName;
			}
			if(data.type == "img"){
				var img = "";
				for(var i = 0; i < msg.length; i++){
					img += "<img src='" + msg[i] + "'>";
				}
				msg = "<div class='block-mess " + unreedClass + "'><span class='my-login'>" + msgName + ": </span><span class=" + classmsg + ">" + img + "</span></div>";
				$(".chat").append(msg);
				var block = document.getElementById("chat");
				block.scrollTop = block.scrollHeight;
				if(author != myAuthor){
					reedMsg = true;
					$(".unreed").removeClass("unreed");
				}
			}
			else if(data.type == "voice"){
				var blob = new Blob([msg], { 'type' : 'audio/ogg; codecs=opus' });
				msg = "<div class='block-mess " + unreedClass + "'><span class='my-login'>" + msgName + ": </span><span class=" + classmsg + "><audio controls src='" + window.URL.createObjectURL(blob) + "'></span></div>";
				$(".chat").append(msg);
				var block = document.getElementById("chat");
				block.scrollTop = block.scrollHeight;
				if(author != myAuthor){
					reedMsg = true;
					$(".unreed").removeClass("unreed");
				}
			}
			else if(msg == "ijk^%$%234qe" && author != myAuthor){
				reedMsg = true;
				$(".unreed").removeClass("unreed");
				msg = "<div class='block-mess-write'>" + msgName + " печатает</div>";
				$(".chat").append(msg);
				var block = document.getElementById("chat");
				block.scrollTop = block.scrollHeight;
				return;
			}
			else if(msg == "xc12ad!#!adz" && author != myAuthor){
				reedMsg = true;
				$(".unreed").removeClass("unreed");
				return;
			}
			else if(msg == "xc12ad!#!addsf" && author != myAuthor){
				reedMsg = false;
				return;
			}
			else if(msg == "sdfgfhg$#%$df" && author != myAuthor){
				$(".block-mess-write").detach();
				return;
			}
			else if(msg != "" && msg != "%$&wgb$5sfgeq#67$235" && msg != "ijk^%$%234qe" && msg != "sdfgfhg$#%$df" && msg != "xc12ad!#!adz" && msg != "xc12ad!#!addsf"){
				msg = "<div class='block-mess " + unreedClass + "'><span class='my-login'>" + msgName + ": </span><span class=" + classmsg + ">" + msg + "</span></div>";
				var block_mess_write = $(".block-mess-write");
				if(block_mess_write.html() != null){
					$(msg).insertBefore(block_mess_write);
				}
				else {
					$(".chat").append(msg);
				}
						var block = document.getElementById("chat");
						block.scrollTop = block.scrollHeight;
			}
			else if(msg == "%$&wgb$5sfgeq#67$235" && author != myAuthor){
				$(".block-mess-write").detach();
					$(".chat").append("<br>Собеседник покинул чат");
					var block = document.getElementById("chat");
					block.scrollTop = block.scrollHeight;
			}

			if(author != myAuthor){
						if(!$('.chat').is(":focus") && !$(".write-message").is(":focus") && !$(".chat-content").is(":focus")){
							if(flag_unreed == false){
							unread_interval = setInterval(unread_message, 1000);
							flag_unreed = true;
						}
						}
						if(flag_unreed)
				audio.play();
			}
	}

	socket.emit("get_rooms", {});

	$(".select_rooms").change(function(){
		roomName = $(this).val();
		socket.removeListener("chat_msg");
		socket.on("chat_msg", update_Chat);
		socket.emit("reconnect_socket", {roomName: roomName});
		$(".chat").html("");

		socket.emit("get_messages", {roomName: $(this).val()});
	});
});
