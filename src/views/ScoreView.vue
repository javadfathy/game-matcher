<script setup lang="ts">
import {ref} from "vue";
import {onMounted} from "vue";
const existingData = ref([])
onMounted(() => {
  existingData.value  = JSON.parse(localStorage.getItem('userScore'))
})
</script>

<template>
  <section v-if="existingData">
    <p v-for="(score, index) in existingData" :key="index">
      Your score: {{score.userScore}} - end at: {{score.atTime}}
    </p>
  </section>
</template>