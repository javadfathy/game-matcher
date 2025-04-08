<script setup lang="ts">

interface Props {
  detail: object
}

const props = defineProps<Props>()

interface Emits {
  (e: 'close')
}

const emits = defineEmits<Emits>()
</script>

<template>
  <div @click="$emit('close')" class="bg-black/80 w-full h-full absolute top-0 bottom-0 z-99 left-0 right-0 flex items-center justify-center">
    <div class="bg-zinc-900 w-1/3 h-1/3 rounded rounded-2xl">
      <p class="p-9 text-2xl">YOUR SCORE: {{props.detail.score}}</p>
      <p class="p-9 text-2xl">AT TIME: {{props.detail.time}}</p>
    </div>
  </div>
</template>