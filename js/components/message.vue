<template>
    <div class="message" :class="{'message--my': message.my}">
        <div class="message__name" v-if="message.name">{{ message.name }}:</div>
        <div class="message__content" v-html="message.message"></div>
    </div>
</template>

<script>
export default {
    name: "message",
    props: ['message']
}
</script>