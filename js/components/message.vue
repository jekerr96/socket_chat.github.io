<template>
    <div class="message" :class="{'message--my': message.my}">
        <div class="message__name" v-if="message.name">{{ message.name }}:</div>
        <div class="message__content" v-if="!message.type || message.type === 'exit'" v-html="message.message"></div>
        <div class="message__content" v-if="message.type === 'img'">
            <img v-for="imgSrc in message.message" :src="imgSrc" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "message",
    props: ['message']
}
</script>