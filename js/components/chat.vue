<template>
    <div class="content-container">
        <div class="chat">
            <div class="chat__content"></div>
            <div class="chat__write-wrap">
                <div class="chat__placeholder" v-if="!message">Введите ваше сообщение...</div>
                <div class="chat__write" contenteditable="true" @input="onInput($event)"></div>
            </div>
            <div class="chat__tools">
                <div class="chat__tools-item">
                    <img src="/images/smile.svg" alt="">
                </div>
                <div class="chat__tools-item">
                    <img src="/images/load-image.svg" alt="">
                </div>
                <div class="chat__tools-item">
                    <img src="/images/mic.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "chat",
    data: function () {
        return {
            message: '',
        };
    },
    methods: {
        onInput: function(ev) {
            this.message = ev.target.innerHTML;
        }
    }
}
</script>