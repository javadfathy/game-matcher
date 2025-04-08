import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useTouchedStore = defineStore('touched',  {
    state: () => ({
        corrected: [],
        step: 0,
        userScore: null,
        atTime: 0,
        showDialog: false,
    }),
    getters: {
    },
    actions: {
        async saveScoreAndTime() {
            const existingData  = localStorage.getItem('userScore')
            const userNewScore = existingData ? JSON.parse(existingData) : [];
            userNewScore.push({userScore: this.userScore, atTime: this.atTime})
            localStorage.setItem('userScore', JSON.stringify( userNewScore))
            this.showDialog = true
        }
    }
})
