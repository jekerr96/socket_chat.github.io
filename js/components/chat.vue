<template>
    <div class="content-container">
        <div class="chat">
            <button class="chat__exit" @click="onExit">
                <img src="/images/close.svg" alt="">
            </button>
            <div class="chat__content custom-scrollbar" ref="messagesContainer">
                <transition-group name="show-from-left" class="chat__content-wrap" appear>
                    <message v-for="message in messages" :message="message" :key="message.timestamp" />
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
                            <img loading="lazy" v-for="item in 189" :src="'/images/smile/Emoji Smiley-' + (item.toString().padStart(2, '0')) + '.png'" alt="">
                        </div>
                    </transition>
                </button>
                <button class="chat__tools-item" @click="$refs.fileLoad.click()">
                    <img src="/images/load-image.svg" alt="">
                    <input ref="fileLoad" type="file" multiple="multiple" hidden>
                </button>
                <button class="chat__tools-item">
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
    data: function () {
        return {
            showSmiles: false,
            message: '',
            messages: [
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 123,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 1234,
                },
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 1235,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 1236,
                },
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 1237,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 1238,
                },
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 1239,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 1230,
                },
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 12311,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 123112,
                },
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 123113,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 123114,
                },
                {
                    my: true,
                    name: 'Аноним',
                    message: 'Тестовое сообщение',
                    timestamp: 123116,
                },
                {
                    my: false,
                    name: 'Люба',
                    message: 'Тестовое сообщение собеседника',
                    timestamp: 123117,
                },
            ],
        };
    },
    methods: {
        onInput: function(ev) {
            this.message = ev.target.innerHTML;
        },
        onExit: function () {
            this.$emit('exit');
            this.message = '';
            this.messages = [];
        },
        sendMessage(ev) {
            if (!this.message) {
                return;
            }

            this.messages.push({
                my: true,
                name: 'Аноним',
                message: this.message,
                timestamp: Date.now(),
            });

            ev.target.innerHTML = '';
            this.message = '';

            this.$nextTick(() => {
                this.$refs.messagesContainer.scrollTo({
                    top: this.$refs.messagesContainer.scrollHeight,
                    behavior: 'smooth',
                });
            });
        }
    }
}
</script>