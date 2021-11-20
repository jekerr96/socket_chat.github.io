<template>
    <div class="content-container">
        <div class="chat">
            <button class="chat__exit" @click="onExit">
                <img src="/images/close.svg" alt="">
            </button>
            <div class="chat__content custom-scrollbar" ref="messagesContainer">
                <transition-group name="show-from-left" class="chat__content-wrap" appear>
                    <message v-for="message in messages" :message="message" :key="message.timestamp" />
                    <div v-if="opponentWrite" class="chat__write-status" key="write-status">Собеседник печатает</div>
                </transition-group>
            </div>
            <div class="chat__write-wrap">
                <div class="chat__placeholder" v-if="!message">Введите ваше сообщение...</div>
                <div class="chat__write" contenteditable="true" @input="onInput($event)" ref="writeMessage" @keypress.enter.prevent="sendMessage($event)"></div>
            </div>
            <div class="chat__tools">
                <button class="chat__tools-item" @mouseenter="showSmiles = true" @mouseleave="showSmiles = false">
                    <img src="/images/smile.svg" alt="">
                    <transition name="opacity">
                        <div class="smiles custom-scrollbar" v-show="showSmiles">
                            <img @click="onSmileClick($event)" loading="lazy" v-for="item in 189" :src="'/images/smile/Emoji Smiley-' + (item.toString().padStart(2, '0')) + '.png'" alt="">
                        </div>
                    </transition>
                </button>
                <button class="chat__tools-item" @click="$refs.fileLoad.click()">
                    <img src="/images/load-image.svg" alt="">
                    <input ref="fileLoad" type="file" multiple="multiple" hidden @change="loadFiles($event)">
                </button>
                <button class="chat__tools-item" @click="toggleVoice">
                    <img src="/images/mic.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "./message.vue";
export default {
    name: "chat",
    components: {Message},
    props: ['socket', 'roomName', 'myName'],
    data: function () {
        return {
            showSmiles: false,
            message: '',
            messages: [],
            myId: 1,
            messageSound: new Audio('../sound/new_message.wav'),

            voiceEnabled: false,
            mediaRecorder: null,

            writeTimeout: null,
            inWrite: false,
            opponentWrite: false,
        };
    },
    computed: {
        name: function () {
            return this.myName ? this.myName : 'Аноним';
        }
    },
    watch: {
        inWrite: function(val) {
            this.socket.emit('setWrite', {
                id: this.myId,
                roomName: this.roomName,
                state: val,
            });
        }
    },
    methods: {
        onInput: function(ev) {
            this.message = ev.target.innerHTML;

            this.inWrite = true;

            if (this.writeTimeout) {
                clearTimeout(this.writeTimeout);
            }

            this.writeTimeout = setTimeout(() => {
                this.inWrite = false;
            }, 3000);
        },

        onExit: function () {
            this.$emit('exit');
            this.message = '';
            this.messages = [];
            this.socket.removeListener("chatMsg");
            this.socket.emit("chatMsg", {
                roomName: this.roomName,
                type: "exit",
            });
        },

        sendMessage(ev) {
            if (!this.message) {
                return;
            }

            this.sendSocketMessage(this.message);

            ev.target.innerHTML = '';
            this.message = '';
        },

        onSmileClick(ev) {
            const img = new Image();
            img.src = ev.target.src;
            img.className = 'chat-smile';
            this.$refs.writeMessage.focus();

            const txt = window.getSelection().getRangeAt(0);
            txt.insertNode(img);
            this.setCursorAfterElement(img);
            this.message = this.$refs.writeMessage.innerHTML;
        },

        setCursorAfterElement(element) {
            let selection = window.getSelection();
            let range = document.createRange();
            range.setStartAfter(element);
            selection.removeAllRanges();
            selection.addRange(range);
        },

        loadFiles(ev) {
            this.encodeImagesAsURL(ev.target.files, images => {
                this.sendSocketMessage(images, 'img');
            });
        },

        encodeImagesAsURL(files, cb) {
            const images = Array.from(files).filter(file => file.type.match('image.*'));
            const encodedImages = [];

            for (const file of files) {
                const reader = new FileReader();

                reader.onload = ev => {
                    encodedImages.push(ev.target.result);

                    if (encodedImages.length === images.length) {
                        cb(encodedImages);
                    }
                }

                reader.onerror = ev => {
                    console.error(ev);
                }

                reader.readAsDataURL(file);
            }
        },

        toggleVoice() {
            if (this.voiceEnabled) {
                this.mediaRecorder.stop();
                this.voiceEnabled = false;

                return;
            }

            navigator.mediaDevices.getUserMedia({audio: true}).then(mediaStream => {
                 this.mediaRecorder = new MediaRecorder(mediaStream);
                 let chunksVoice = [];

                this.mediaRecorder.onstart = function(e) {
                    chunksVoice = [];
                };
                this.mediaRecorder.ondataavailable = function(e) {
                    chunksVoice.push(e.data);
                };
                this.mediaRecorder.onstop = function(e) {
                    let blob = new Blob(chunksVoice, { 'type' : 'audio/ogg; codecs=opus' });
                    chunksVoice = [];
                    mediaStream.getAudioTracks()[0].stop();
                    this.sendSocketMessage(blob, 'voice');
                };

                this.mediaRecorder.start();
            });

            this.voiceEnabled = true;
        },

        sendSocketMessage(message, type = 'message') {
            this.socket.emit("chatMsg", {
                id: this.myId,
                name: this.name,
                roomName: this.roomName,
                message,
                type,
                timestamp: Date.now(),
            });
        },
    },

    created() {
        this.myId = Math.random();

        this.socket.on('chatMsg', data => {
            const message = data;
            message.my = data.id === this.myId;

            switch (message.type) {
                case 'exit':
                    this.messages.push({
                        my: false,
                        message: 'Собеседник покинул(а) чат',
                        timestamp: Date.now(),
                    });
                    break;
                default:
                    this.messages.push(message);
            }

            if (!message.my) {
                this.messageSound.play();
            }

            this.opponentWrite = false;

            this.$nextTick(() => {
                this.$refs.messagesContainer.scrollTo({
                    top: this.$refs.messagesContainer.scrollHeight,
                    behavior: 'smooth',
                });
            });
        });

        this.socket.on('setWrite', data => {
            if (data.id === this.myId) {
                return;
            }

            this.opponentWrite = data.state;
        });

        window.onbeforeunload = () => {
            return "Покинуть чат?";
        };
    },

    beforeDestroy() {
        window.onbeforeunload = () => {};
        this.socket.removeListener('chatMSg');
        this.socket.removeListener('setWrite');
    }
}
</script>