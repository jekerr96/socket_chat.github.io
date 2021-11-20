<template>
    <div>
        <div class="header">
            <div class="header__title">Добро пожаловать в&nbsp;анонимный чат. Приятного общения!</div>
        </div>
        <div class="container">
            <transition mode="out-in" name="show-from-top">
                <div v-if="currentState !== state.chat" class="selector">
                    <div class="content-container">
                        <ad-block class="yandex-block-top" />
                        <div class="selector__wrapper">
                            <div class="selector__content">
                                <div class="selector__about-wrap">
                                    <div class="selector__about selector__about--me">
                                        <div class="selector__about-title">Пожалуйста, представьтесь</div>
                                        <div class="selector__field-label">Как Вас называть?</div>
                                        <input v-model="myName" class="selector__input" type="text" placeholder="Меня зовут...">
                                        <div class="selector__field-label">Ваш возраст</div>
                                        <multiselect v-model="meYear"
                                                     :options="meData.years"
                                                     label="label"
                                                     track-by="value"
                                                     placeholder="Выберите ваш возраст"
                                                     :show-labels="false"
                                        />
                                        <div class="selector__field-label">Ваш пол</div>
                                        <div class="selector__sex">
                                            <label v-for="item in meData.sex" :key="item.label">
                                                <input class="selector__radio" type="radio" name="my-sex" :value="item" v-model="mySex">
                                                <span class="selector__sex-label">{{ item.label }}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="selector__about selector__about--opponent">
                                        <div class="selector__about-title">Кого будем искать?</div>
                                        <div class="selector__field-label">Пол собеседника</div>
                                        <multiselect v-model="opponentYear"
                                                     :options="opponentData.years"
                                                     label="label"
                                                     track-by="value"
                                                     placeholder="Выберите возраст собеседника"
                                                     :show-labels="false"
                                        />
                                        <div class="selector__field-label">Пол собеседника</div>
                                        <div class="selector__sex">
                                            <label v-for="item in opponentData.sex" :key="item.label">
                                                <input class="selector__radio" type="radio" name="opponent-sex" :value="item" v-model="opponentSex">
                                                <span class="selector__sex-label">{{ item.label }}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="selector__images">
                                    <div v-if="mySex" :style="{'backgroundImage': `url('${mySex.image}')`}" alt="" class="selector__image selector__image--me"></div>
                                    <div v-if="opponentSex" :style="{'backgroundImage': `url('${opponentSex.image}')`}" alt="" class="selector__image selector__image--opponent"></div>
                                </div>
                                <div class="selector__btn-wrap" @click="findHandler">
                                    <button class="btn"><span>{{ btnText }}</span></button>
                                </div>
                                <transition name="opacity">
                                    <loader v-if="currentState === state.find" @cancel="onSearchCancel" />
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <chat v-if="currentState === state.chat" @exit="onChatExit" :socket="socket" :room-name="roomName" :my-name="myName" />
            </transition>
        </div>
    </div>
</template>

<script>
import AdBlock from "./ad-block.vue";
import Loader from "./loader.vue";
import Chat from "./chat.vue";
import Multiselect from 'vue-multiselect'
import { io } from "socket.io-client";
import { load } from 'recaptcha-v3'

export default {
    name: "app",
    components: {Chat, Loader, AdBlock, Multiselect},
    data: function () {
        return {
            currentState: '',

            meYear: null,
            mySex: null,
            myName: '',
            meData: {
                years: [
                    {value: 1, label: 'До 18', initSelected: true},
                    {value: 2, label: '18-21'},
                    {value: 3, label: '22-26'},
                    {value: 4, label: '27-35'},
                    {value: 5, label: '36+'},
                ],
                sex: [
                    {value: 1, label: 'Мужской', image: '/images/male.png', initSelected: true},
                    {value: 2, label: 'Женский', image: '/images/female.png'},
                ],
            },
            opponentYear: null,
            opponentSex: null,
            opponentData: {
                years: [
                    {value: 0, label: 'Любой', initSelected: true},
                    {value: 1, label: 'До 18'},
                    {value: 2, label: '18-21'},
                    {value: 3, label: '22-26'},
                    {value: 4, label: '27-35'},
                    {value: 5, label: '36+'},
                ],
                sex: [
                    {value: 1, label: 'Мужской', image: '/images/male.png'},
                    {value: 2, label: 'Женский', image: '/images/female.png', initSelected: true},
                    {value: 0, label: 'Любой', image: '/images/anonim.png'},
                ],
            },

            roomName: '',
            socket: null,

            findSound: new Audio('../sound/find.wav'),
        };
    },
    methods: {
        initSocket: function() {
            this.socket = io('127.0.0.1:3000');

            this.socket.on('connect', this.onSocketReconnect);
        },

        findHandler: async function () {
            this.currentState = this.state.find;

            this.socket.on('onFind', this.onFind);

            this.socket.emit("search", {
                me: {
                    sex: this.mySex.value,
                    years: this.meYear.value,
                },
                find: {
                    sex: this.opponentSex.value,
                    years: this.opponentYear.value,
                },
                token: await this.getRecaptchaToken(),
            });
        },

        onSocketReconnect: function() {
            if (this.roomName) {
                this.socket.emit('reconnectSocket', {roomName: this.roomName});
            }
        },

        onFind: function(data) {
            this.socket.removeListener("onFind");
            this.currentState = this.state.chat;
            this.roomName = data.roomName;
            this.findSound.play();
        },

        onSearchCancel() {
            this.currentState = this.state.select
            this.socket.emit("cancelSearch", {});
            this.socket.removeListener("onFind");
        },

        onChatExit() {

            this.currentState = this.state.select;
        },

        async getRecaptchaToken() {
            return await this.recaptcha.execute('find')
        }
    },
    computed: {
        btnText: function() {
            return this.opponentSex.value === 2 ? "Найти собеседницу" : "Найти собеседника";
        },
        state: function() {
            return {
                select: 'select',
                find: 'find',
                chat: 'chat',
            };
        }
    },
    async created() {
        this.mySex = this.meData.sex.find(item => item.initSelected);
        this.meYear = this.meData.years.find(item => item.initSelected);

        this.opponentSex = this.opponentData.sex.find(item => item.initSelected);
        this.opponentYear = this.opponentData.years.find(item => item.initSelected);

        this.currentState = this.state.select;

        this.initSocket();
        this.recaptcha = await load('6Ld9PUIdAAAAAOk4dUjk56BPaPGgEWZAKjW1RP61')
    },
}
</script>