<script setup lang="ts">
import {useTouchedStore} from "@/stores/touched.ts";
import {storeToRefs} from "pinia";
import TheDialog from "@/components/TheDialog.vue";

const touchedStore = useTouchedStore()

const { showDialog, userScore, atTime } = storeToRefs(touchedStore)


</script>

<template>
  <section>
    <header class="flex gap-6 text-xl pb-4">
      <router-link :to="{name: 'home'}">home</router-link>
      <router-link :to="{name: 'scores'}">scores</router-link>
    </header>
    <main>
      <router-view />
    </main>
    <TheDialog @close="touchedStore.resetData()" v-if="showDialog" :detail="{score: userScore, time: atTime}"/>
  </section>
</template>

<style scoped>

</style>
