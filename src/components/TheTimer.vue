<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import {useTouchedStore} from "@/stores/touched.ts";
import {storeToRefs} from "pinia";

const touchStore = useTouchedStore()

const { atTime } = storeToRefs(touchStore)


const emit = defineEmits<Emit>()
interface Emit {
  (e: 'finishTime')
  (e: 'startTime')
}

interface Props {
  finishTime: {
    default: false
    type: boolean
  }
}

const props = defineProps<Props>()
const seconds = ref(80)
const isActive = ref(false)
let timer = null


const formattedTime = computed(() => {
  const minutes = Math.floor(seconds.value / 60)
  const remainingSeconds = seconds.value % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
})

const startCountdown = () => {
  if (!isActive.value && seconds.value > 0) {
    isActive.value = true
    emit('startTime')
    timer = setInterval(() => {
      atTime.value = `${Math.floor((80 - seconds.value) / 60)}:${(80 - seconds.value) < 10 ? '0' : ''}${((80 - seconds.value) % 60)}`
      if (seconds.value > 0 && !props.finishTime) {
        seconds.value--
      } else {
        resetTimer()
      }
    }, 1000)
  }
}

const pauseTimer = () => {
  isActive.value = false
  clearInterval(timer)
}

const resetTimer = () => {
  pauseTimer()
  seconds.value = 80
}

onUnmounted(() => {
  clearInterval(timer)
})

watch(seconds, (newVal) => {
  if (newVal === 0) {
    emit('finishTime')
  }
})
</script>

<template>
  <div class="justify-center items-center ">
    <button class="bg-teal-800 px-4 py-3 inline-block cursor-pointer" @click="startCountdown">Start</button>
    <button class="bg-teal-800 px-4 py-3 inline-block cursor-pointer" @click="resetTimer">Reset</button>
    <p class="inline-block text-2xl ">Time: {{formattedTime }}</p>
  </div>
</template>

<style scoped>
button {
  margin: 10px 10px
}
</style>