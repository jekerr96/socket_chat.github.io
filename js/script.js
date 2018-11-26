$(document).ready(function(){

	new_token();
	var male = true;

	$(".left-left-skip").click(function(){
		var lcim = $(".left-class-img-male");
		lcim.removeClass("show-left-class-img");
		lcim.removeClass("new-pos-left-class-img");
		lcim.removeClass("show-left-class-img");
		lcim.removeClass("new-pos-right-class-img");
		lcim.addClass("hide-left-class-img");

		setTimeout(function(){
			if(male == true)
			{
				var lc = $(".left-class");
				lc.removeClass("left-class-script-male");
				lc.addClass("left-class-script-female");
				$(".left-class-img-male").attr("src", "images/female.png");
				$(".left-left-skip").removeClass("left-skip-male");
				$(".left-right-skip").removeClass("right-skip-male");
				$(".input-name").css("border", "3px solid rgba(159, 100, 160, 0.47)");
				$(".left-left-skip").addClass("left-skip-female");
				$(".left-right-skip").addClass("right-skip-female");
				male = false;
			}

			else{
				var lc = $(".left-class");
				lc.removeClass("left-class-script-female");
				lc.addClass("left-class-script-male");
				$(".left-class-img-male").attr("src", "images/male.png");
				$(".left-left-skip").removeClass("left-skip-female");
				$(".left-right-skip").removeClass("right-skip-female");
				$(".input-name").css("border", "3px solid rgba(0, 78, 255, 0.19)");
				$(".left-left-skip").addClass("left-skip-male");
				$(".left-right-skip").addClass("right-skip-male");
				$(".left-class-img-male").attr("src", "images/male.png");
				male = true;
			}
			$(".left-class-img-male").removeClass("hide-left-class-img");
			$(".left-class-img-male").addClass("new-pos-left-class-img");
			setTimeout(function(){
				$(".left-class-img-male").addClass("show-left-class-img");
			}, 200);
		}, 300);
	});

	$(".left-right-skip").click(function(){
		var lcim = $(".left-class-img-male");
		lcim.removeClass("show-left-class-img");
		lcim.removeClass("new-pos-right-class-img");
		lcim.removeClass("show-left-class-img");
		lcim.removeClass("new-pos-left-class-img");
		lcim.addClass("hide-right-class-img");

		setTimeout(function(){
			if(male == true)
			{
				var lc = $(".left-class");
				lc.removeClass("left-class-script-male");
				lc.addClass("left-class-script-female");
				$(".left-left-skip").removeClass("left-skip-male");
				$(".left-right-skip").removeClass("right-skip-male");
				$(".input-name").css("border", "3px solid rgba(159, 100, 160, 0.47)");
				$(".left-left-skip").addClass("left-skip-female");
				$(".left-right-skip").addClass("right-skip-female");
				$(".left-class-img-male").attr("src", "images/female.png");
				male = false;
			}
			else{
				var lc = $(".left-class");
				lc.removeClass("left-class-script-female");
				lc.addClass("left-class-script-male");
				$(".left-class-img-male").attr("src", "images/male.png");
				$(".left-left-skip").removeClass("left-skip-female");
				$(".left-right-skip").removeClass("right-skip-female");
				$(".input-name").css("border", "3px solid rgba(0, 78, 255, 0.19)");
				$(".left-left-skip").addClass("left-skip-male");
				$(".left-right-skip").addClass("right-skip-male");
				male = true;
			}
			$(".left-class-img-male").removeClass("hide-right-class-img");
			$(".left-class-img-male").addClass("new-pos-right-class-img");

			setTimeout(function(){
				$(".left-class-img-male").addClass("show-left-class-img");
			}, 150);
		}, 300);
	});

	var rightmale = false;
	var anonim = false;

	$(".right-left-skip").click(function(){
		if(anonim == false)
		{
			var rcim = $(".right-class-img-male");
			rcim.removeClass("show-left-class-img");
			rcim.removeClass("new-pos-left-class-img");
			rcim.removeClass("show-left-class-img");
			rcim.removeClass("new-pos-right-class-img");
			rcim.addClass("hide-left-class-img");

			setTimeout(function(){
				if(rightmale == true)
				{
					var rc = $(".right-class");
					var button = $(".button-search");
					rc.removeClass("right-class-script-male");
					rc.removeClass("right-class-anonim");
					rc.addClass("right-class-script-female");
					$(".right-left-skip").removeClass("left-skip-male");
					$(".right-right-skip").removeClass("right-skip-male");
					button.removeClass("button-search-script-male");
					button.removeClass("button-search-anonim");
					button.addClass("button-search-script-female");
					$(".right-left-skip").addClass("left-skip-female");
					$(".right-right-skip").addClass("right-skip-female");
					$(".right-class-img-male").attr("src", "images/female.png");
					button.html("Найти собеседницу");
					rightmale = false;
				}
				else{
					var rc = $(".right-class");
					var button = $(".button-search");
					rc.removeClass("right-class-script-female");
					rc.removeClass("right-class-anonim");
					rc.addClass("right-class-script-male");
					$(".right-left-skip").removeClass("left-skip-female");
					$(".right-right-skip").removeClass("right-skip-female");
					$(".right-left-skip").addClass("left-skip-male");
					$(".right-right-skip").addClass("right-skip-male");
					$(".right-class-img-male").attr("src", "images/male.png");
					button.removeClass("button-search-script-female");
					button.removeClass("button-search-anonim");
					button.addClass("button-search-script-male");
					button.html("Найти собеседника");
					rightmale = true;
				}
				$(".right-class-img-male").removeClass("hide-left-class-img");
				$(".right-class-img-male").addClass("new-pos-left-class-img");
				setTimeout(function(){
					$(".right-class-img-male").addClass("show-left-class-img");
				}, 150);
			}, 300);
		}
	});

	$(".right-right-skip").click(function(){
		var rcim = $(".right-class-img-male");
		rcim.removeClass("show-left-class-img");
		rcim.removeClass("new-pos-right-class-img");
		rcim.removeClass("show-left-class-img");
		rcim.removeClass("new-pos-left-class-img");
		rcim.addClass("hide-right-class-img");

		setTimeout(function(){
			if(rightmale == true)
			{
				var rc = $(".right-class");
				var button = $(".button-search");
				rc.removeClass("right-class-script-male");
				rc.removeClass("right-class-anonim");
				rc.addClass("right-class-script-female");
				$(".right-left-skip").removeClass("left-skip-male");
				$(".right-right-skip").removeClass("right-skip-male");
				button.removeClass("button-search-script-male");
				button.removeClass("button-search-anonim");
				button.addClass("button-search-script-female");
				$(".right-left-skip").addClass("left-skip-female");
				$(".right-right-skip").addClass("right-skip-female");
				$(".right-class-img-male").attr("src", "images/female.png");
				button.html("Найти собеседницу");
				rightmale = false;
			}
			else{
				var rc = $(".right-class");
				var button = $(".button-search");
				rc.removeClass("right-class-script-male");
				rc.removeClass("right-class-anonim");
				rc.addClass("right-class-script-female");
				$(".right-left-skip").removeClass("left-skip-female");
				$(".right-right-skip").removeClass("right-skip-female");	
				$(".right-left-skip").addClass("left-skip-male");
				$(".right-right-skip").addClass("right-skip-male");
				$(".right-class-img-male").attr("src", "images/male.png");
				button.html("Найти собеседника");
				button.removeClass("button-search-script-female");
				button.removeClass("button-search-anonim");
				button.addClass("button-search-script-male");
				rightmale = true;
			}

			$(".right-class-img-male").removeClass("hide-right-class-img");
			$(".right-class-img-male").addClass("new-pos-right-class-img");
			setTimeout(function(){
				$(".right-class-img-male").addClass("show-left-class-img");
			}, 150);
		}, 300);
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
			$(".right-left-skip").click();
			$(".right-arrow-up").hide();
			$(".right-arrow-down").hide();
			$(".right-year-text").hide();
			setTimeout(function(){
				$(".right-class-img-male").attr("src", "images/anonim.png");
				$(".right-class").removeClass(".right-class-script-female");
				$(".right-class").removeClass(".right-class-script-male");
				$(".right-class").addClass("right-class-anonim");
				$(".button-search").removeClass("button-search-script-female");
				$(".button-search").removeClass("button-search-script-male");
				$(".button-search").addClass("button-search-anonim");
				$(".button-search").html("Найти собеседника");
				rightvosrast = 0;
				$(".right-year-text").html("Любой");
				anonim = true;
			}, 300);
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
		if(male == true)
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
		else if(rightmale == true)
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
		refMsg.off();
		last_element = null;
		clearInterval(write_interval);

		document.body.style.overflow = "hidden";
		window.scrollTo(0,0);
		firebase.database().ref('messages/' + tokenMsg).push().set({
    				msg : "%$&wgb$5sfgeq#67$235",
    				author : myAuthor
  					});
		refMsg.off();
		$(".search-opponent").hide("fast");
		$(".chat-content").removeClass("show-chat-content");
		$(".chat-content").fadeOut(3000);
		setTimeout(function(){
			$(".block-classificate").fadeIn(1);
			$(".block-classificate").toggleClass("hide-block-classificate");
			new_token();
		}, 1000);
		setTimeout(function(){
			$("body").css("background-image", "url(" + fon1.src + ")");
			setTimeout(function(){
				document.body.style.overflow = "";
			}, 2000);
		}, 2000);
		$(".chat").html("");
	});

	$(".exit-search").click(function(){
		$(".search-opponent").hide();
		firebase.database().ref('search/' + token).remove();
		commentsRef.off();
		createSearch.off();
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

					firebase.database().ref('messages/' + tokenMsg).push().set({
    				msg : "sdfgfhg$#%$df",
    				author : myAuthor
  					});

					firebase.database().ref('messages/' + tokenMsg).push().set({
    				msg : $(this).html(),
    				author : myAuthor
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
			firebase.database().ref('messages/' + tokenMsg).push().set({
    				msg : "ijk^%$%234qe",
    				author : myAuthor
  					});
		}
		else if(currentDate - 3000 > write_time && isWrite == true){
			isWrite = false;
			firebase.database().ref('messages/' + tokenMsg).push().set({
    				msg : "sdfgfhg$#%$df",
    				author : myAuthor
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
		var msgName;
		refMsg = firebase.database().ref('messages/' + tokenMsg);
		refMsg.on('child_added', function(data){
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
			}
			else if(msg == "%$&wgb$5sfgeq#67$235" && author != myAuthor){
				$(".block-mess-write").detach();
					$(".chat").append("<br>Собеседник покинул чат");
					refMsg.off();
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
	/*setInterval(check_update, 60000);
	function check_update()
	{
		$.ajax({
			type: "POST",
			url: "include/check_update.php",
			data: "",
			dataType: "html",
			cache: false,
			success: function(data) { 
				//alert(data);
			}
		});

	}*/
	setInterval(update_count, 30000);
	update_count();
	function update_count()
	{
			$.ajax({
			type: "POST",
			url: "include/update_count.php",
			data: "",
			dataType: "html",
			cache: false,
			success: function(data) { 
				if($(".input-name").val() == "1026")
				$(".count_online, .count_online_menu").html("Сейчас онлайн: " + data);
				else
				$(".count_online, .count_online_menu").html("");
			}
		});
	}

	visit();
	function visit()
	{
		$.ajax({
			type: "POST",
			url: "include/visit.php",
			data: "",
			dataType: "html",
			cache: false,
			success: function(data) { 
				
			}
		});
	}

	function new_token()
	{
		var text = "";
  		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 	    for (var i = 0; i < 35; i++)
   			 text += possible.charAt(Math.floor(Math.random() * possible.length));
		token = text;
		
		/*$.ajax({
			type: "POST",
			url: "include/new-token.php",
			data: "",
			dataType: "html",
			cache: false,
			success: function(data) { 
				token = data;
			}
		});*/

	}

var token;
var opponentToken = "";
var opponentName;
var tokenMsg;
var isFind = false;
var isChange = false;
var commentsRef;
var createSearch;
var c = 0;
var removed = false;

	function Search(aboutme, aboutopponent, myname){
		
		commentsRef = firebase.database().ref('search/');
		createSearch = firebase.database().ref('search/');
		var search2;
		isFind = false;
		removed = false;
		isChange = false;
		c = 0;
		if(isChange == true){
			return;
		}

		commentsRef.on('child_added', function(data){

			if(data.val().opponentToken == ""){
				var ao = data.val().aboutopponent;
				var am = data.val().aboutme;
				var opponentToken = data.val().opponentToken;
				//var date = new Date();
				//var search_date = data.val().time;
					if((aboutopponent == "00" && ao == "00")//хоть кто хоть кого
						|| (aboutopponent[1] != "0" && aboutopponent[0] == am[0] && aboutme[0] == ao[0] && aboutopponent[1] == am[1] && aboutme[1] == ao[1] && ao[1] != "0")
						|| (aboutopponent[1] == "0" && aboutopponent[0] == am[0] && aboutme[0] == ao[0] && aboutme[1] == ao[1] && ao[1] != "0")
						|| (aboutopponent[1] != "0" && aboutopponent[0] == am[0] && aboutme[0] == ao[0] && aboutopponent[1] == am[1] && ao[1] == "0")
						|| (aboutopponent[1] == "0" && aboutopponent[0] == am[0] && aboutme[0] == ao[0] && ao[1] == "0")
						|| (aboutopponent == "00" && ao[0] != "0" && ao[1] != "0" && aboutme[1] == ao[1] && aboutme[0] == ao[0])
						|| (aboutopponent == "00" && ao[0] != "0" && ao[1] == "0" && aboutme[0] == ao[0])
						|| (aboutopponent != "00" && ao == "00" && aboutopponent[0] == am[0] && aboutopponent[1] != "0" && aboutopponent[1] == am[1])
						|| (aboutopponent != "00" && ao == "00" && aboutopponent[0] == am[0] && aboutopponent[1] == "0"))
					{
					commentsRef.off();
					myAuthor = 1;
					search2 = firebase.database().ref('search/' + data.val().token + "/" + token);
					find(data, search2, myname, aboutme, aboutopponent);

					search2.on('child_changed', function(data_change){
						if(!isChange){
						isChange = true;
						search2.off();
						firebase.database().ref('search/' + tokenMsg).remove();
						openChat();
					}
					});
					search2.on('child_removed', function(data_del){
						setTimeout(function(){
							if(!inChat){
								removed = true;
								search2.off();
								Search(aboutme, aboutopponent, myname);
								return;
							}
						}, 1000);
					});
				}
		}
	});
		


		setTimeout(function(){
			if(isFind != true && !inChat){
				//var date = new Date();
				commentsRef.off();
			firebase.database().ref('search/' + token).set({
				aboutme : aboutme,
				aboutopponent : aboutopponent,
				myname : myname,
				token : token,
				//time : date.getTime(),
				opponentToken : "",
				opponentName : ""
			});

			createSearch.on('child_changed', function(data){
				if(data.val().token == token){
				createSearch.off();
				tokenMsg = token;
				myAuthor = 0;
				opponentToken = data.val().opponentToken;
				opponentName = data.val().opponentName;
				firebase.database().ref('search/' + token + "/" + opponentToken).update({
					opponentToken : token,
					opponentName : myname
				});
				createSearch.on('child_removed', function(){
					createSearch.off();
					openChat();
				});
				
			}
			});
}
		}, 5000);

	}




	function find(data, search2, myname, aboutme, aboutopponent){
		if(isFind == false){
					isFind = true;
					opponentName = data.val().myname;
					tokenMsg = data.val().token;
					firebase.database().ref('search/' + data.val().token).update({
						opponentToken : token,
						opponentName : name
					});
					
					search2.set({
						opponentName : myname,
						opponentToken : token,
						token : data.val().token
					});
				}

		setTimeout(function(){
			if(!inChat && !isChange){
				isFind = false;
				search2.off();
				Search(aboutme, aboutopponent, myname);
			}
		}, 5000);
	}
	
	var inChat = false;
	function openChat(){
		inChat = true;
		find_audio.play();
		imWrite();
		$(".chat").html("");
					document.body.style.overflow = "hidden";
					window.scrollTo(0,0);
					$(".chat").html("");
					$(".block-classificate").toggleClass("hide-block-classificate");
					$(".block-classificate").fadeOut(1000);
					setTimeout(function(){
						if(male == true)
						{
							$("body").css("background-image", "url(" + fon2.src + ")");
							$(".block-chat").removeClass("block-chat-female");
							$(".write-message").removeClass("write-message-female");
							$(".chat").removeClass("chat-female");
						}
						else
						{
							$("body").css("background-image", "url(" + girl_fon.src + ")");
							$(".block-chat").addClass("block-chat-female");
							$(".write-message").addClass("write-message-female");
							$(".chat").addClass("chat-female");
						}
						setTimeout(function(){
							document.body.style.overflow = "";
						}, 2000);
						var block = document.getElementById("chat");
						block.scrollTop = block.scrollHeight;
					}, 2000);
					$(".chat-content").fadeIn(1000);
					$(".chat-content").addClass("show-chat-content");
		Update_Chat();
	}

	window.onbeforeunload = function(){
		if(inChat){
			return "Покинуть чат?";
		
	}

	};

	window.addEventListener('unload', function(event) {
		firebase.database().ref('search/' + token).remove();
		if(inChat)
         firebase.database().ref('messages/' + tokenMsg).push().set({
    				msg : "%$&wgb$5sfgeq#67$235",
    				author : myAuthor
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
		load_image(files);
	});
	function load_image(files){
		var progressBar = $("#progress");
		progressBar.show();
		if(files != null)
		{
			var data = new FormData();
			$.each( files, function( key, value ){
				data.append( key, value );
			});

			$.ajax({
				url: './include/load-image.php',
				type: 'POST',
				data: data,
				cache: false,
				dataType: 'html',
        processData: false, // Не обрабатываем файлы (Don't process the files)
        contentType: false, // Так jQuery скажет серверу что это строковой запрос
        xhr: function(){
        var xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
        xhr.upload.addEventListener('progress', function(evt){ // добавляем обработчик события progress (onprogress)
          if(evt.lengthComputable) { // если известно количество байт
            // высчитываем процент загруженного
            var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
            // устанавливаем значение в атрибут value тега <progress>
            // и это же значение альтернативным текстом для браузеров, не поддерживающих <progress>
            progressBar.val(percentComplete).text('Загружено ' + percentComplete + '%');
        }
    }, false);
        return xhr;
    },
    success: function( data ){
    	setTimeout(function(){
    		progressBar.hide();
    	}, 2000);
    	var img = new Image();
    	img.src=data;
    	$('.load_image').prop('value', null);
    	$(".write-message").focus();  
    	$('.load-image').value = null;
    	var start = window.getSelection().getRangeAt(0).startOffset;
    	var txt = window.getSelection().getRangeAt(0);

    	txt.insertNode(img);
    	SetCursorAfterElement(img);
    }
});
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
	drop_zone[0].ondrop = function(e){
		var progressBar = $("#progress");
		progressBar.show();
		e.preventDefault();
		var files = e.dataTransfer.files;
		var formData = new FormData(),
		xhr = new XMLHttpRequest(),	x;
		if(files.length == 1 && files[0].type.match(/image.*/)) {
			formData.append('0', files[0]);
			xhr.onload = function() {
				
				setTimeout(function(){
					progressBar.hide();
				}, 2000);
				var data = this.responseText;
				var img = new Image();
				img.src=data;
				$('.load_image').prop('value', null);
				$(".write-message").focus();  
				$('.load-image').value = null;
				var start = window.getSelection().getRangeAt(0).startOffset;
				var txt = window.getSelection().getRangeAt(0);
				txt.insertNode(img);
				SetCursorAfterElement(img);
			};
			xhr.upload.onprogress = function(evt) {
  				if(evt.lengthComputable) { // если известно количество байт
            // высчитываем процент загруженного
            var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
            // устанавливаем значение в атрибут value тега <progress>
            // и это же значение альтернативным текстом для браузеров, не поддерживающих <progress>
            progressBar.val(percentComplete).text('Загружено ' + percentComplete + '%');
        }
    };
    xhr.open('post', 'include/load-image.php');
    xhr.send(formData);
}
}

}); 