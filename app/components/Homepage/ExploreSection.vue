<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import KeenSlider from "keen-slider";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";

const images = [
  "/img/explore/explore-1.jpg",
  "/img/explore/explore-2.jpg",
  "/img/explore/explore-3.jpg",
  "/img/explore/explore-1.jpg",
  "/img/explore/explore-2.jpg",
  "/img/explore/explore-3.jpg",
];

const sliderRef = ref<HTMLElement | null>(null);
let slider: KeenSliderInstance | null = null;

const currentPage = ref(0);
const totalPages = ref(1); // SAFE DEFAULT
const sliderReady = ref(false); // PREVENT INDICATOR ERRORS

let autoplayTimer: any = null;

function recalcPages(s: KeenSliderInstance) {
  const d = s.track?.details;
  if (!d) return; // SAFE GUARD
  totalPages.value = Math.max(1, d.maxIdx + 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => slider?.next(), 2500);
}
function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
}

onMounted(() => {
  if (!sliderRef.value) return;

  slider = new KeenSlider(sliderRef.value, {
    loop: false,
    slides: { perView: 1.1, spacing: 20 },

    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 1.5, spacing: 20 } },
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
      "(min-width: 1280px)": { slides: { perView: 3, spacing: 24 } },
    },

    created(s) {
      recalcPages(s);
      sliderReady.value = true;

      sliderRef.value?.addEventListener("mouseenter", stopAutoplay);
      sliderRef.value?.addEventListener("mouseleave", startAutoplay);

      startAutoplay();
    },

    slideChanged(s) {
      currentPage.value = s.track.details?.rel || 0;
    },

    updated(s) {
      recalcPages(s);
    },
  });
});

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>

<template>
  <section class="bg-sarva-green">
    <div class="pt-32 text-white container px-5 xl:px-0 mx-auto max-w-324">
      <h2 class="font-serif text-[36px] lg:text-[40px] font-medium">
        Explore the Wonders of Ubud
      </h2>
      <p class="max-w-[686px] lg:text-xl mt-6">
        Adventure awaits just moments away from this family villa Ubud, whether
        you’re visiting the iconic Monkey Forest eco-tourism site or seeking
        thrills with a whitewater rafting adventure or bicycle tour exploring
        villages to Kintamani.
      </p>
    </div>
    <div class="pb-46 pl-5 container md:px-5 md:mx-auto xl:px-0 max-w-324">
      <ul ref="sliderRef" class="keen-slider mt-10">
        <li
          v-for="(item, idx) in images"
          :key="idx"
          class="keen-slider__slide aspect-square min-h-[400px]"
        >
          <img :src="item" class="object-cover w-full h-full" />
        </li>
      </ul>
      <div class="flex justify-center mt-8 pr-6 md:pr-0">
        <button
          v-for="i in totalPages"
          :key="i"
          @click="slider?.moveToIdx(i - 1)"
          class="h-[5px] w-full transition-all duration-300"
          :class="currentPage === i - 1 ? 'bg-primary' : 'bg-[#D9D9D9]'"
        ></button>
      </div>
    </div>
  </section>
</template>
