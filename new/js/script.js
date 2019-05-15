$(document).ready(function() {
    let socket = io("//localhost:3000");

    const STATUS = {
        FIND: 1,
        CHAT: 2,
        MENU: 3,
    };

    const sounds = {
        find: new Audio("../sound/find.wav"),
        message: new Audio("../sound/new_message.wav"),
    };

    let currentStatus = STATUS.MENU;

    socket.on("reconnect", function(){
        if(currentStatus === STATUS.FIND){
            $(".js-btn-find").click();
        }
        if(currentStatus === STATUS.CHAT){
            socket.emit("reconnectSocket", {roomName: roomName} );
        }
    });

    $(".js-select").each(function(i, el) {
       let $el = $(el);

        $el.select2({
            minimumResultsForSearch: -1,
            width: "100%",
            dropdownParent: $el.closest("div"),
        });
    });

    $(".js-about-me-sex").click(function() {
        $(".js-about-me-image").removeClass("male female").addClass($(this).data("class"));
    });

    $(".js-about-opponent-sex").click(function() {
        $(".js-about-opponent-image").removeClass("male female anonim").addClass($(this).data("class"));
    });

    $(".js-btn-find").click(function() {
       $(".js-find-container").removeClass("hide");
       currentStatus = STATUS.FIND;

        socket.on("onFind", onFind);

        myName = $(".js-my-name").val();

        if (myName == "") myName = "Аноним";

        socket.emit("find", {
            me: {
                name: myName,
                sex: $("input[name='my-sex']").groupVal(),
                years: $(".js-select-me").val(),
            },
            find: {
                sex: $("input[name='opponent-sex']").groupVal(),
                years: $(".js-select-opponent").val(),
            },
        });

        //setTimeout(onFind, 1000);
    });

    $(".js-cancel-find").click(function() {
        $(".js-find-container").addClass("hide");
        socket.emit("cancelSearch", {});
        socket.removeListener("onFind");
        currentStatus = STATUS.MENU;
    });

    $(".js-write-message").focus(function() {
        $(".js-write-placeholder").addClass("hide");
    });

    $(".js-write-message").blur(function() {
        if ($(this).html().length <= 0)
            $(".js-write-placeholder").removeClass("hide");
    });

    let osInstance = $(".js-os-chat").overlayScrollbars({

    }).overlayScrollbars();

    $(".js-os").overlayScrollbars({

    });

    let imWriteTimeout;
    let imWrite = false;

    $(".write-message").keydown(function(e) {

        if(e.ctrlKey == true && e.keyCode == 13)
        {
            var reg = new RegExp("<br>((</div>)*)$");
            if(!reg.test($(this).html()))
                new_br();
            return false;
        }

        if(e.keyCode == 13 && $(this).html() != "") {
            let re = /(?!")((https|http):\/\/.+?)(&nbsp;|\s|$)/g;
            let msg = $(this).html();
            msg = msg.replace(re, function(a, b){
                console.log(a);
                if(b === undefined)
                    return "";
                if(b[b.length - 1] == "\"" || b[b.length - 1] == "'")
                    return a;
                return " <a href='" + b + "' target='_blank'>" + b + "</a> ";
            });

            re = /(style=".*?")|(style='.*?')/gi;
            msg = msg.replace(re, ' ');

            socket.emit("onMsg", {
                msg: "",
                index: myIndex,
                type: "endWrite",
                roomName: roomName,
            });

            clearInterval(imWriteTimeout);
            imWrite = false;

            socket.emit("onMsg", {
                msg: msg,
                index: myIndex,
                type: "text",
                roomName: roomName,
            });

            $(this).html("");
            return false;
        }

        if (!imWrite) {
            imWrite = true;

            socket.emit("onMsg", {
                msg: "",
                index: myIndex,
                type: "write",
                roomName: roomName,
            });
        }

        clearInterval(imWriteTimeout);
        imWriteTimeout = setTimeout(() => {
            imWrite = false;
            socket.emit("onMsg", {
                msg: "",
                index: myIndex,
                type: "endWrite",
                roomName: roomName,
            });
        }, 3000);
    });

    $(".js-exit").click(exit);

    $(".chat").on("click", "img", function() {
        if ($(this).hasClass("chat-smile")) return;
        let $images = $(".chat img");
        let index = $images.index($(this));
        let images = [];

        $images.each(function(i, el) {
            let $el = $(el);

            if (!$el.hasClass("chat-smile")) {
                images.push({
                    src: $el.attr("src"),
                    type: 'image',
                    opts: {}
                });
            }
        });

        $.fancybox.open(images, {
            index: index,
            loop: true,
        });
    });

    $(".js-load-image").click(function() {
       $(".js-files").click();
    });

    function lazyLoadSmiles() {
        $(".js-smile").each(function(i, el) {
           el.src = el.dataset.src;
        });
    }

    let opponentName;
    let roomName;
    let myIndex;
    let myName;

    function onFind(data) {
        $(".js-chat .os-content").html("");
        $(".js-find-container").addClass("hide");
        $(".js-find-content").addClass("hide");
        $(".js-chat-content").removeClass("hide");
        lazyLoadSmiles();

        opponentName = data.name;
        roomName = data.roomName;
        myIndex = data.index;

        socket.removeListener("onFind");
        socket.on("onMsg", onMessage);
        currentStatus = STATUS.CHAT;
        sounds.find.play();
    }

    function exit() {
        $(".js-find-container").addClass("hide");
        $(".js-find-content").removeClass("hide");
        $(".js-chat-content").addClass("hide");

        socket.removeListener("onMsg");
        socket.emit("onMsg", {
            roomName: roomName,
            type: "exit",
        });

        currentStatus = STATUS.MENU;
    }

    function onMessage(data) {
        let msgClass = "my";
        let msgName = myName;
        if (data.index !== myIndex) {
            msgClass = "opponent";
            msgName = opponentName;

            if (data.type != "write" && data.type != "endWrite")
                sounds.message.play();
        }
        let msg;

        if (data.type == "text") {

            msg = `<div class="msg-container ${msgClass}">
                    <div class="author-name">
                        ${msgName}
                    </div>
                    <div class="msg">
                        ${data.msg}
                    </div>
                </div>`;

        } else if (data.type == "img") {
            let img = "";
            for(let i = 0; i < data.msg.length; i++){
                img += "<img src='" + data.msg[i] + "'>";
            }

            msg = `<div class="msg-container ${msgClass}">
                    <div class="author-name">
                        ${msgName}
                    </div>
                    <div class="msg">
                        ${img}
                    </div>
                </div>`;

        } else if (data.type == "write" && data.index !== myIndex) {

            msg = `<div class="opponent-write js-opponent-write">Собеседник печатает</div>`;

        } else if(data.type == "endWrite" && data.type != "exit" && data.index !== myIndex) {

            $(".js-opponent-write").remove();

        } else if(data.type == "voice") {

            let blob = new Blob([data.msg], { 'type' : 'audio/ogg; codecs=opus' });
            msg = `<div class="msg-container ${msgClass}">
                    <div class="author-name">
                        ${msgName}
                    </div>
                    <div class="msg">
                        <audio controls src='${window.URL.createObjectURL(blob)}'>
                    </div>
                </div>`;
        } else if (data.type == "exit") {
            $(".js-opponent-write").remove();
            msg = `<div class="opponent-exit">${opponentName} покинул(а) чат</div>`;
        }

        $(".js-chat .os-content").append(msg);
        scrollChat();
    }

    $(".js-smile").click(function(){
        var img = new Image();
        img.src = $(this).attr("src");
        img.className = "chat-smile";
        $(".js-write-message").focus();
        let txt = window.getSelection().getRangeAt(0);
        //txt.insertNode(document.createTextNode(img));
        txt.insertNode(img);
        SetCursorAfterElement(img);
    });

    function new_br() {
        let div = document.createElement('div');
        let txt = window.getSelection().getRangeAt(0);
        div.innerHTML = "<br>";
        txt.insertNode(div);
        SetCursorAfterElement(div);
    }

    function SetCursorAfterElement(element) {
        let selection = window.getSelection();
        let range = document.createRange();
        range.setStartAfter(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function scrollChat() {
        if (osInstance.scroll().max.y - osInstance.scroll().position.y <= 150)
            osInstance.scroll({y: "100%"}, 500);
    }

    $('.js-files').change(function(){
        let files;
        files = this.files;
        encodeImageFileAsURL(files, function(images){
            socket.emit("onMsg", {
                msg: images,
                type: "img",
                roomName: roomName,
                index: myIndex
            });
        });
    });

    var drop_zone = $(".js-write-message");
    drop_zone[0].ondragover = function(e){
        e.preventDefault();
    };

    drop_zone[0].ondrop = function(e){
        e.preventDefault();
        let files = e.dataTransfer.files;
        encodeImageFileAsURL(files, function(images){
            socket.emit("onMsg", {
                msg: images,
                type: "img",
                roomName: roomName,
                index: myIndex
            });
        });
    };

    function encodeImageFileAsURL(files, cb) {

        for(let i = 0; i < files.length; i++){
            if(!files[i].type.match('image.*'))
                return;
        }

        let images = [];
        let count = 0;

        for(let i = 0; i < files.length; i++){
            let file = files[i];
            let reader = new FileReader();
            reader.index = i;

            reader.onload = function(e) {

                images.push(e.target.result);
                count++;
                if(count == files.length){
                    cb(images);
                }

            };
            reader.onloadend = function(){
                $(".load_image").val("");
            };

            reader.readAsDataURL(file);
        }

    }

    let mediaRecorder;
    let constraints = { audio: true };
    let chunks_voice = [];
    let recording_voice = false;


    $(".js-audio-msg").click(function(){
        if(!recording_voice){
            navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
                mediaRecorder = new MediaRecorder(mediaStream);
                mediaRecorder.onstart = function(e) {
                    chunks_voice = [];
                };
                mediaRecorder.ondataavailable = function(e) {
                    chunks_voice.push(e.data);
                };
                mediaRecorder.onstop = function(e) {
                    let blob = new Blob(chunks_voice, { 'type' : 'audio/ogg; codecs=opus' });
                    chunks_voice = [];
                    mediaStream.getAudioTracks()[0].stop();
                    socket.emit("onMsg", {
                        roomName: roomName,
                        index: myIndex,
                        msg: blob,
                        type: "voice",
                    });
                };
                mediaRecorder.start();
            });

        }
        else{
            mediaRecorder.stop();
        }
        recording_voice = !recording_voice;
    });

    window.onbeforeunload = function(){
        if(currentStatus === STATUS.CHAT){
            return "Покинуть чат?";
        }

    };

    window.addEventListener('unload', function(event) {
        if(currentStatus === STATUS.CHAT) {
            socket.emit("onMsg", {
                msg: "",
                index: myIndex,
                roomName: roomName,
                type: "exit"
            });
        }
    });

    $.fn.extend({
        groupVal: function() {
            return $(this).filter(':checked').val();
        }
    });
});