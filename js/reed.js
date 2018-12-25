$(document).ready(function(){
  var socket = io('https://socketchat-uxkelnoqmk.now.sh');
  var myAuthor = 0;
  var audio = new Audio();
  var name = "Аноним1";
  var opponentName = "Аноним2";
  var unread_interval;
	var flag_unreed = false;
  var roomName = "";
  var reedMsg = true;
  var online = -1;
  audio.src = "sound/new_message.mp3";
  audio.load();

  socket.on("chat_msg", Update_Chat);

  socket.on("getRooms", function(data){
    var rooms = {};
    for(key in data){
      rooms[data[key].roomName] = data[key].roomName;
    }
    for(key in rooms){
      $(".selectRoom").append("<option value='" + rooms[key] + "'>" + rooms[key] + "</option>");
    }
  });

  socket.emit("getRooms", {});

  socket.on("getMsg", function(data){
    for(key in data){
      Update_Chat(data[key]);
    }
  });

  socket.on("reconnect", function(){
			socket.emit("reconnect_socket", {roomName: roomName} );
	});

  socket.on("online", function(data){
    if(online != -1 && online < data.online)
    sendNotification('Кто-то зашел в чат', {
      body: 'Сейчас онлайн: ' + data.online,
      icon: 'images/favicon.png',
      dir: 'auto'
    });
    online = data.online;
    $(".count_online").html("Сейчас онлайн: " + data.online);
  });

  $(".selectRoom").change(function(){
    $(".chat").html("");
    reedMsg = true;
    socket.emit("reed_socket", {oldRoom: roomName, roomName: $(this).val()} );
    roomName = $(this).val();
    socket.emit("getMsg", {roomName: roomName});
  });

  $(".delMsg").click(function(){
    if(confirm("Вы действительно хотите удалить сообщения?"))
      socket.emit("deleteMsg", {});
  });
  function unread_message(){
		var title = $("title");

		if(flag_unreed == false)
		{
			$(title).html("Анонимный чат")
			return;
		}

		if($(title).html() == "Анонимный чат")
			$(title).html("Новое сообщение!");
		else
			$(title).html("Анонимный чат");
	}

  function Update_Chat(data)
	{

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

  $(".chat").click(function(e){
		if(e.target == "[object HTMLImageElement]")
		{
			var img = e.target;
			if(!$(img).hasClass("chat-smile"))
			{
				$(".img-show").attr("src", img.src);
				document.body.style.overflow = "hidden";
				window.scrollTo(0,0);
				$(".show-image").show();
			}
		}
	});

	$('.show-image').click(function(){
		document.body.style.overflow = "";
		window.scrollTo(0,0);
		$(this).hide();
	});
});

function sendNotification(title, options) {
// Проверим, поддерживает ли браузер HTML5 Notifications
if (!("Notification" in window)) {
alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
}

// Проверим, есть ли права на отправку уведомлений
else if (Notification.permission === "granted") {
// Если права есть, отправим уведомление
var notification = new Notification(title, options);

function clickFunc() { alert('Пользователь кликнул на уведомление'); }

notification.onclick = clickFunc;
}

// Если прав нет, пытаемся их получить
else if (Notification.permission !== 'denied') {
Notification.requestPermission(function (permission) {
// Если права успешно получены, отправляем уведомление
if (permission === "granted") {
var notification = new Notification(title, options);

} else {
alert('Вы запретили показывать уведомления'); // Юзер отклонил наш запрос на показ уведомлений
}
});
} else {
// Пользователь ранее отклонил наш запрос на показ уведомлений
// В этом месте мы можем, но не будем его беспокоить. Уважайте решения своих пользователей.
}
}
