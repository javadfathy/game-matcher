<script setup lang="ts">
const existingData  = JSON.parse(localStorage.getItem('userScore'))
</script>

<template>
  <section>
    <p v-for="(score, index) in existingData" :key="index">
      Your score: {{score.userScore}} - end at: {{score.atTime}}
    </p>
  </section>
</template>