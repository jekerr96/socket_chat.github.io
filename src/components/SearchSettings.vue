<template>
    <div class="search-wrap">
        <template v-if="!inSearch">
            <div class="about-me">
                <div class="block-title">Пожалуйста, представьтесь</div>
                <label>
                    <input type="text" placeholder="Меня зовут..." v-model="aboutMe.name">
                </label>
                <label>
                    <select v-model="aboutMe.selectedYear">
                        <option v-for="year in aboutMe.years" :key="year.id" :value="year.id">{{ year.value }}</option>
                    </select>
                </label>
                <label v-for="sexItem in aboutMe.sex" :key="sexItem.id">
                    <input name="mySex" type="radio" :value="sexItem.id" v-bind:checked="sexItem.id === aboutMe.selectedSex" v-on:change="setMySex(sexItem)">
                    <span class="radio-label">{{ sexItem.value }}</span>
                </label>
                <img :src="require('@/assets/images/' + (aboutMe.sexImage ? aboutMe.sexImage : aboutMe.sex[0].image))" alt="">
            </div>
            <div class="about-opponent">
                <div class="block-title">Кого будем искать?</div>
                <label>
                    <input type="text" placeholder="Меня зовут...">
                </label>
                <label>
                    <select v-model="aboutOpponent.selectedYear">
                        <option v-for="year in aboutOpponent.years" :key="year.id" :value="year.id">{{ year.value }}</option>
                    </select>
                </label>
                <label v-for="sexItem in aboutOpponent.sex" :key="sexItem.id">
                    <input name="opponentSex" type="radio" :value="sexItem.id" v-bind:checked="sexItem.id === aboutOpponent.selectedSex" v-on:change="setOpponentSex(sexItem)">
                    <span class="radio-label">{{ sexItem.value }}</span>
                </label>
                <img :src="require('@/assets/images/' + (aboutOpponent.sexImage ? aboutOpponent.sexImage : aboutOpponent.sex[0].image))" alt="">
            </div>
            <div class="btn-find" v-on:click="search">Найти собеседника</div>
        </template>
        <template v-if="inSearch">
           <div v-on:click="exitSearch()"> Поиск...</div>
        </template>
    </div>
</template>

<script>

import Socket from "@/socket";

export default {
    data: function () {
        return {
            socket: new Socket(undefined, undefined, {
                onFind: this.onFind,
            }),
            inSearch: false,
            aboutMe: {
                name: "Аноним",
                selectedYear: 1,
                years: [
                    {id: 1, value: "До 18"},
                    {id: 2, value: "18-21"},
                    {id: 3, value: "22-26"},
                    {id: 4, value: "27-35"},
                    {id: 5, value: "36+"},
                ],
                selectedSex: 1,
                sexImage: null,
                sex: [
                    {id: 1, value: "Мужской", image: 'male.png'},
                    {id: 2, value: "Женский", image: 'female.png'},
                ]
            },
            aboutOpponent: {
                selectedYear: 0,
                years: [
                    {id: 0, value: "Любой"},
                    {id: 1, value: "До 18"},
                    {id: 2, value: "18-21"},
                    {id: 3, value: "22-26"},
                    {id: 4, value: "27-35"},
                    {id: 5, value: "36+"},
                ],
                selectedSex: 1,
                sexImage: null,
                sex: [
                    {id: 1, value: "Мужской", image: 'male.png'},
                    {id: 2, value: "Женский", image: 'female.png'},
                    {id: 0, value: "Любой", image: 'anonim.png'},
                ]
            },
        }
    },
    methods: {
        setMySex: function (sexItem) {
            this.aboutMe.selectedSex = sexItem.id;
            this.aboutMe.sexImage = sexItem.image;
        },

        setOpponentSex: function (sexItem) {
            this.aboutOpponent.selectedSex = sexItem.id;
            this.aboutOpponent.sexImage = sexItem.image;
        },

        search: function () {
            this.inSearch = true;
            this.socket.find({
                me: {
                    name: this.aboutMe.name ?? "Аноним",
                    sex: this.aboutMe.selectedSex,
                    years: this.aboutMe.selectedYear,
                },
                find: {
                    sex: this.aboutOpponent.selectedSex,
                    years: this.aboutOpponent.selectedYear,
                },
            });
        },

        exitSearch() {
            this.inSearch = false;
            this.socket.cancelFind();
        },

        onFind() {
            
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 100px;
    }
</style>
