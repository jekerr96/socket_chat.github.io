$(document).ready(function(){
	var socket = io('//socketchat-pemnpwjxua.now.sh');
	var male = true;


	socket.on("disconnect", function(){
		send_msg = false;
	});
	socket.on("reconnect", function(){
		socket.emit("reconnect_socket", {roomName: roomName} );
		send_msg = true;
	});

	$(".left-left-skip").click(function(){
		var time_change = 600;
		var src_sex = "";
		male = !male;

		if(male){
			src_sex = "images/male.png";
			$(".left-class").removeClass("sex-female");
			$(".left-class").addClass("sex-male");
			$(".input-name").css("border", "3px solid rgba(0, 78, 255, 0.19)");
		}
		else {
			src_sex = "images/female.png";
			$(".left-class").removeClass("sex-male");
			$(".left-class").addClass("sex-female");
			$(".input-name").css("border", "3px solid rgba(159, 100, 160, 0.47)");
		}

		$(".left-class-img-male").effect("drop", time_change, function(){
			$(".left-class-img-male").attr("src", src_sex);
			$(this).effect("drop", {direction: "right", mode: "show"}, time_change);
		});
	});

	var rightmale = false;
	var anonim = false;

	$(".right-left-skip").click(function(){

		var time_change = 600;
		var src_sex = "";

		if(anonim){
			if($(".right-class").hasClass("right-class-anonim"))
				return;
			rightmale = !rightmale;
			$(".button-search").removeClass("button-search-script-male").removeClass("button-search-script-female").addClass("button-search-anonim").html("Найти собеседника");
			$(this).toggleClass("scale-skip");
			src_sex = "images/anonim.png";
			$(".right-class").removeClass("sex-female").removeClass("sex-male").addClass("right-class-anonim");
			$(".right-class-img-male").effect("drop", time_change, function(){
				$(".right-class-img-male").attr("src", src_sex);
				$(this).effect("drop", {direction: "right", mode: "show"}, time_change);
			});
			return;
		}

		rightmale = !rightmale;

		if(rightmale){
			src_sex = "images/male.png";
			$(".button-search").removeClass("button-search-anonim").removeClass("button-search-script-female").addClass("button-search-script-male").html("Найти собеседника");
			$(".right-class").removeClass("sex-female").removeClass("right-class-anonim");
			$(".right-class").addClass("sex-male");
		}
		else {
			src_sex = "images/female.png";
			$(".right-class").removeClass("sex-male").removeClass("right-class-anonim");
			$(".right-class").addClass("sex-female");
			$(".button-search").removeClass("button-search-anonim").removeClass("button-search-script-male").addClass("button-search-script-female").html("Найти собеседницу");
		}

		$(".right-class-img-male").effect("drop", time_change, function(){
			$(".right-class-img-male").attr("src", src_sex);
			$(this).effect("drop", {direction: "right", mode: "show"}, time_change);
		});
	});

	var vosrast = 1;

	$(".left-arrow-up").click(function(){
		if(vosrast != 1)
		{
			vosrast -=1;
		}
		var lyt = $(".left-year-text");
		switch(vosrast)
		{
			//case 0: $(".left-year-text").html("Любой");  break;
			case 1: $(lyt).html("До 18");  break;
			case 2: $(lyt).html("18-21"); break;
			case 3: $(lyt).html("22-26"); break;
			case 4: $(lyt).html("27-35"); break;
			case 5: $(lyt).html("36+");  break;
			default : $(lyt).html("До 18");  break;
		}
	});

	$(".left-arrow-down").click(function(){
		if(vosrast != 5)
		{
			vosrast +=1;
		}
		var lyt = $(".left-year-text");
		switch(vosrast)
		{
			//case 0: $(".left-year-text").html("Любой");  break;
			case 1: $(lyt).html("До 18");  break;
			case 2: $(lyt).html("18-21"); break;
			case 3: $(lyt).html("22-26"); break;
			case 4: $(lyt).html("27-35"); break;
			case 5: $(lyt).html("36+");  break;
			default : $(lyt).html("До 18");  break;
		}
	});

	var rightvosrast = 0;

	$(".right-arrow-up").click(function(){
		if(rightvosrast != 0)
		{
			rightvosrast -=1;
		}
		var ryt = $(".right-year-text");
		switch(rightvosrast)
		{
			case 0: $(ryt).html("Любой");  break;
			case 1: $(ryt).html("До 18");  break;
			case 2: $(ryt).html("18-21"); break;
			case 3: $(ryt).html("22-26"); break;
			case 4: $(ryt).html("27-35"); break;
			case 5: $(ryt).html("36+");  break;
			default : $(ryt).html("До 18");  break;
		}
	});

	$(".right-arrow-down").click(function(){
		if(rightvosrast != 5)
		{
			rightvosrast +=1;
		}
		var ryt = $(".right-year-text");
		switch(rightvosrast)
		{

			case 0: $(ryt).html("Любой");  break;
			case 1: $(ryt).html("До 18");  break;
			case 2: $(ryt).html("18-21"); break;
			case 3: $(ryt).html("22-26"); break;
			case 4: $(ryt).html("27-35"); break;
			case 5: $(ryt).html("36+");  break;
			default : $(ryt).html("До 18");  break;
		}
	});


	$(".block-right-name > select").change(function(){
		if($(this).val() == 0)
		{
			anonim = true;
			$(".right-left-skip").click();
			$(".right-arrow-up").hide();
			$(".right-arrow-down").hide();
			$(".right-year-text").hide();
				rightvosrast = 0;
				$(".right-year-text").html("Любой");

		}
		if($(this).val() == 1)
		{
			anonim = false;
			$(".right-arrow-up").show();
			$(".right-arrow-down").show();
			$(".right-year-text").show();
			$(".right-left-skip").click();
		}
	});

	$(".button-search").click(function(){
		$(".search-opponent").show();
		var pol = "";
		if(male)
		{
			pol = "1";
		}
		else
		{
			pol = "2";
		}
		var result = pol + vosrast;
		var opppol = "";
		//alert($(".block-right-name > select").val());

		if($(".block-right-name > select").val() == 0)
		{
			opppol = "0";
			rightvosrast = "0";
		}
		else if(rightmale)
		{
			opppol = "1";
		}
		else
		{
			opppol = "2";
		}
		var oppresult = opppol+rightvosrast;

		if($(".input-name").val() == "")
		{
			name = "Аноним";
		}
		else
		{
			name = $(".input-name").val();
			name = name.substr(0, 20);
		}
		Search(result, oppresult, name);
	});
	$(".left-left-skip").click(function(){
		$(this).toggleClass("scale-skip");
	});
	$(".right-left-skip").click(function(){
		if(anonim == false)
		$(this).toggleClass("scale-skip");
	});

	var fon1= new Image();
	fon1.src = "images/fon1.jpg";
	var fon2 = new Image();
	fon2.src = "images/fon2.jpg";
	var girl_fon = new Image();
	girl_fon.src = "images/girl-fon.jpg";

	$(".exit-opponent").click(function(){
		inChat = false;
		isFind = false;
		isChange = false;
		isWrite = false;
		write_time = new Date(0);

		last_element = null;
		clearInterval(write_interval);

		window.scrollTo(0,0);
		socket.emit("chat_msg", {
    				msg : "%$&wgb$5sfgeq#67$235",
    				author : myAuthor,
						roomName: roomName
					});
		socket.removeListener("chat_msg");
		$(".search-opponent").hide("fast");
		document.body.style.overflow = "hidden";

		$(".chat-content").effect("drop", {direction: "down"}, 1000, function(){
			$(".block-classificate").effect("drop", {direction: "up", mode: "show"}, 1000, function(){
				document.body.style.overflow = "";
				$("body").css("background-image", "url(" + fon1.src + ")");
			});
		});

		$(".chat").html("");
	});

	$(".exit-search").click(function(){
		$(".search-opponent").hide();
		socket.removeListener("on_find");
		socket.removeListener("chat_msg");
		socket.emit("cancel", {});
		isFind = true;
	});

	var send_msg = true;
	$(".write-message").keydown(function(e){

		if(e.keyCode != 13){
			write_time = new Date();
		}

		if(e.ctrlKey == true && e.keyCode == 13)
		{
			var reg = new RegExp("<br>((</div>)*)$");
			if(!reg.test($(this).html()))
				new_br();
			return false;
		}

		//var p = new RegExp("&nbsp;*\s*$");
		if(e.keyCode == 13 && $(this).html() != ""/* && !p.test($(this).html())*/)
		{
			if(send_msg == true)
			{

					socket.emit("chat_msg", {
    				msg : "sdfgfhg$#%$df",
    				author : myAuthor,
						roomName: roomName
  					})

					socket.emit("chat_msg", {
    				msg : $(this).html(),
    				author : myAuthor,
						roomName: roomName
					});
  					isWrite = false;
  					write_time = new Date(0);

					after_send();
			}
			return false;
		}

		if(e.keyCode == 13)
			return false;
		else{
			send_msg = true;
		}

	});
	function new_br()
	{
		var div = document.createElement('div');
		var txt = window.getSelection().getRangeAt(0);
		div.innerHTML = "<br>";
		txt.insertNode(div);
		SetCursorAfterElement(div);
	}
	function after_send()
	{
		$(".write-message").html("");
		var block = document.getElementById("chat");
		block.scrollTop = block.scrollHeight;
		send_msg = true;
	}

	var write_interval;
	var write_time = new Date(0);
	var isWrite = false;
	function imWrite(){

		write_interval = setInterval(function(){
			var currentDate = new Date();
			if(currentDate - 3000 < write_time && isWrite == false){
			isWrite = true;
			socket.emit("chat_msg", {
    				msg : "ijk^%$%234qe",
    				author : myAuthor,
						roomName: roomName
					});

		}
		else if(currentDate - 3000 > write_time && isWrite == true){
			isWrite = false;
			socket.emit("chat_msg", {
    				msg : "sdfgfhg$#%$df",
    				author : myAuthor,
						roomName: roomName
					});

		}
		}, 1000);

	}

	var audio = new Audio();
	var find_audio = new Audio();
	find_audio.src = "sound/find.wav";
	audio.src = "sound/new_message.mp3";
	audio.load();
	var myAuthor;
	var name = "";
	var refMsg;
	function Update_Chat()
	{
		socket.on("chat_msg", function(data){
			var msg = data.msg;
			var author = data.author;
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
					msg = "<div class='block-mess'><span class='my-login'>" + msgName + ": </span><span class=" + classmsg + ">" + img + "</span></div>";
					$(".chat").append(msg);
					var block = document.getElementById("chat");
					block.scrollTop = block.scrollHeight;
				}
				else if(msg == "ijk^%$%234qe" && author != myAuthor){
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
		});
	}
	$(window).focus(function(){
		clearInterval(unread_interval);
		$("title").html("Анонимный чат");
		flag_unreed = false;
	});
	var unread_interval;
	var flag_unreed = false;
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

var opponentName;
var roomName = "";

	function Search(aboutme, aboutopponent, myname){

		socket.on("on_find", function(data){
			name = myname;
			opponentName = data.name;
			myAuthor = data.author;
			roomName = data.room;
			socket.removeListener("search");
			socket.removeListener("on_find");
			openChat();
		});

		socket.emit("search", {im: aboutme, opponent: aboutopponent, my_name: myname});
	}

	var inChat = false;

	function openChat(){
		document.body.style.overflow = "hidden";
		inChat = true;
		find_audio.play();
		imWrite();
		$(".chat").html("");
		window.scrollTo(0,0);
		$(".block-classificate").effect("drop", {direction: "up"}, 1000, function(){
			$(".chat-content").effect("drop", {direction: "down", mode: "show"}, 1000, function(){
				document.body.style.overflow = "";
				if(male){
					$("body").css("background-image", "url(" + fon2.src + ")");
					$(".block-chat").removeClass("block-chat-female");
					$(".write-message").removeClass("write-message-female");
					$(".chat").removeClass("chat-female");
				}
				else {
					$("body").css("background-image", "url(" + girl_fon.src + ")");
					$(".block-chat").addClass("block-chat-female");
					$(".write-message").addClass("write-message-female");
					$(".chat").addClass("chat-female");
				}
			});
		});
		Update_Chat();
	}

	window.onbeforeunload = function(){
		if(inChat){
			return "Покинуть чат?";

	}

	};

	window.addEventListener('unload', function(event) {
		if(inChat)
		socket.emit("chat_msg", {
			 msg : "%$&wgb$5sfgeq#67$235",
			 author : myAuthor,
			 roomName: roomName
		 });

      });

	$(".list-chat-smile").click(function(){
		var img = new Image();
		img.src = $(this).attr("src");
		img.className = "chat-smile";
		$(".write-message").focus();
		var txt = window.getSelection().getRangeAt(0);
		//txt.insertNode(document.createTextNode(img));
		txt.insertNode(img);
		SetCursorAfterElement(img);
	});

	function SetCursorAfterElement(element)
	{
		var selection = window.getSelection();
		var range = document.createRange();
		range.setStartAfter(element);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	$('.new-image').click(function(){
		$('.load_image').click();
	})


	$('.load_image').change(function(){
		var files;
		files = this.files;
		encodeImageFileAsURL(files, function(images){
			socket.emit("chat_msg", {msg: images, type: "img", roomName: roomName, author: myAuthor});
		});
	});

	function encodeImageFileAsURL(files, cb) {

		for(var i = 0; i < files.length; i++){
			if(!files[i].type.match('image.*'))
				return;
		}
		$("#progress").show();
	var images = [];
	var count = 0;
	var max_percent = files.length * 100;
	var current_percent = {};
	var size = 0;
	for(var i = 0; i < files.length; i++){
		size += files[i].size;
	}
	for(var i = 0; i < files.length; i++){
  var file = files[i];
  var reader = new FileReader();
	reader.index = i;
	reader.onprogress = function(data){
			current_percent[this.index] = data.loaded;
			var summ_percent = 0;
			for(key in current_percent){
				summ_percent += current_percent[key];
			}
			console.log(summ_percent + " / " + size);
			console.log(current_percent);
			$("#progress").val( parseInt( ((summ_percent / size) * 100), 10 ));
	};

  reader.onload = function(e) {

		images.push(e.target.result);
		count++;
		if(count == files.length){
			cb(images);

		}

  };
	reader.onloadend = function(){
		$("#progress").hide();
		$(".load_image").val("");
	};
  reader.readAsDataURL(file);
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

	var drop_zone = $(".write-message");
	drop_zone[0].ondragover = function(e){
	  e.preventDefault();
	}

	drop_zone[0].ondrop = function(e){
	  e.preventDefault();
	  var files = e.dataTransfer.files;
	  encodeImageFileAsURL(files, function(images){
			socket.emit("chat_msg", {msg: images, type: "img", roomName: roomName, author: myAuthor});
		});
	}
});
