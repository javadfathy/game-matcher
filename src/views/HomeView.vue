<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useTouchedStore} from "@/stores/touched.ts";
import {storeToRefs} from "pinia";
import TheTimer from "@/components/TheTimer.vue";


const touchedStore = useTouchedStore();
const isFinishTime = ref(false)
const { corrected, userScore } = storeToRefs(touchedStore)
const shuffle = ref([])
const generateRandomNumber = (): number => {
  const numbers = new Set(); // برای ذخیره اعداد منحصر به فرد
  const modCounts: any = {};      // برای شمارش تعداد هر باقیمانده (مود ۸)
  const maxAttempts = 10000; // حداکثر تلاش برای جلوگیری از حلقه بی‌نهایت
  let attempts = 0;


  // مقداردهی اولیه شمارنده‌های باقیمانده
  for (let i = 0; i < 8; i++) {
    modCounts[i] = 0;
  }

  while (numbers.size < 16 && attempts < maxAttempts) {
    attempts++;
    const randomNum = Math.floor(Math.random() * 1000); // محدوده تصادفی (۰ تا ۹۹۹)
    const mod = randomNum % 8;

    // بررسی یکتا بودن عدد و حداکثر ۲ تکراری برای مود آن
    if (!numbers.has(randomNum) && modCounts[mod] < 2) {
      numbers.add(randomNum);
      modCounts[mod]++;
    }
  }

  if (numbers.size !== 16) {
    throw new Error("نمی‌توان ۱۶ عدد با شرایط داده شده تولید کرد!");
  }

  return Array.from(numbers);
}

onMounted(() => {
  shuffle.value = generateRandomNumber()
})

const items = ref([
  {
    id: 1,
    image: '/1.png'
  },
  {
    id: 2,
    image: '/2.jpg'
  },
  {
    id: 3,
    image: '/3.png'
  },
  {
    id: 4,
    image: '/4.png'
  },
  {
    id: 5,
    image: '/5.webp'
  },
  {
    id: 6,
    image: '/6.jpg'
  },
  {
    id: 7,
    image: '/7.webp'
  },
  {
    id: 8,
    image: '/8.webp'
  }
])

const itemSelected = ref([])

const checkSelected = (value) => {
  console.log(value)
    if (value[0] === value[1]) {
      corrected.value.push(value[0]);
      userScore.value++
      if (corrected.value.length === 8) {
        saveAndReset()
      }
      console.log("correct")
    }
  itemSelected.value = []
}

const selected = ref<[number]>([])

watch(selected, (value) => {
  if (selected.value.length >= 2) {
    checkSelected(itemSelected.value)
    setTimeout(() => {
      selected.value = []
    }, 500)
  }
})


const saveAndReset = () => {
  isFinishTime.value = true
  touchedStore.saveScoreAndTime()
}

const isStart = ref(false)
const start = () => {
  isStart.value =  true
}
</script>

<template>
  <section>

    <div class="container grid grid-cols-4 items-center relative">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-stone-950/90" :class="{'hidden' : isStart}"></div>
      <div
          v-for="(item, index) in shuffle"
          :key="index"
          :class="{
            'show-image' : selected.includes(index) || corrected.includes(items[item % 8].id)
          }"
          @click="selected = [...selected, index]; itemSelected = [...itemSelected, items[item % 8].id]"
              class="h-30 bg-black text-center flex items-center justify-center font-600 text-3xl border transition-all w-auto"
          >
        <img class=" h-[100%] " :src="items[item % 8].image" alt="" />
        <p>{{index}}</p>{{items[item % 8].id}}
      </div>
    </div>
    <TheTimer :finish-time="isFinishTime" @finish-time="saveAndReset" @start-time="start"/>
  </section>
</template>

<style scoped>
.show-image {
  transform: rotateY(180deg);
}
img {
  opacity: 0;
  display: none;
  transition: opacity 0.5s;
}
.show-image img {
  opacity: 1;
  display: block;
}
.show-image p {
  display: none;
}
</style>