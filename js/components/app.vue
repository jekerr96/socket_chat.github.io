<template>
    <div>
        <div class="header">
            <div class="header__title">Добро пожаловать в&nbsp;анонимный чат. Добро пожаловать!</div>
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
                                        <input class="selector__input" type="text" placeholder="Меня зовут...">
                                        <div class="selector__field-label">Ваш возраст</div>
                                        <select v-model="meYear">
                                            <option v-for="item in meData.years" :key="item.label" :value="item">{{ item.label }}</option>
                                        </select>
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
                                        <select v-model="opponentYear">
                                            <option v-for="item in opponentData.years" :key="item.label" :value="item">{{ item.label }}</option>
                                        </select>
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
                                <div class="selector__btn-wrap" @click="currentState = state.chat">
                                    <button class="btn"><span>{{ btnText }}</span></button>
                                </div>
                                <transition name="opacity">
                                    <loader v-if="currentState === state.find" @cancel="currentState = state.select" />
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <chat v-if="currentState === state.chat" />
            </transition>
        </div>
    </div>
</template>

<script>
import AdBlock from "./ad-block.vue";
import Loader from "./loader.vue";
import Chat from "./chat.vue";

export default {
    name: "app",
    components: {Chat, Loader, AdBlock},
    data: function () {
        return {
            currentState: '',

            meYear: null,
            mySex: null,
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
        };
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
    created() {
        this.mySex = this.meData.sex.find(item => item.initSelected);
        this.meYear = this.meData.years.find(item => item.initSelected);

        this.opponentSex = this.opponentData.sex.find(item => item.initSelected);
        this.opponentYear = this.opponentData.years.find(item => item.initSelected);

        this.currentState = this.state.select;
    }
}
</script>