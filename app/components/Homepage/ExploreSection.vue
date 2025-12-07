<script lang="ts" setup>
import { ref, onMounted } from "vue";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

const sliderRef = ref<HTMLElement | null>(null);
let slider: null = null;

onMounted(() => {
  if (sliderRef.value) {
    slider = new KeenSlider(sliderRef.value, {
      loop: true,
      slides: {
        perView: 1.1,
        spacing: 20,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: {
            perView: 1.5,
            spacing: 20,
          },
        },
        "(min-width: 768px)": {
          slides: {
            perView: 2,
            spacing: 20,
          },
        },
        "(min-width: 1024px)": {
          slides: {
            perView: 3,
            spacing: 24,
          },
        },
        "(min-width: 1280px)": {
          slides: {
            perView: 3,
            spacing: 24,
          },
        },
      },
    });
  }
});
</script>

<template>
  <section class="bg-sarva-green">
    <div class="pt-32 text-white container px-5 2xl:px-0 mx-auto max-w-7xl">
      <h2 class="font-serif text-[36px] lg:text-[40px]">
        Explore the Wonders of Ubud
      </h2>
      <p class="max-w-[680px] lg:text-xl mt-6">
        Adventure awaits just moments away from this family villa Ubud, whether
        you’re visiting the iconic Monkey Forest eco-tourism site or seeking
        thrills with a whitewater rafting adventure or bicycle tour exploring
        villages to Kintamani.
      </p>
    </div>
    <div class="pb-46 pl-5 container md:px-5 md:mx-auto 2xl:px-0 max-w-7xl">
      <ul ref="sliderRef" class="keen-slider mt-10">
        <li class="keen-slider__slide aspect-square min-h-[400px]">
          <img
            src="@/assets/img/explore-1.jpg"
            class="object-cover w-full h-full"
          />
        </li>

        <li class="keen-slider__slide aspect-square min-h-[400px]">
          <img
            src="@/assets/img/explore-2.jpg"
            class="object-cover w-full h-full"
          />
        </li>

        <li class="keen-slider__slide aspect-square min-h-[400px]">
          <img
            src="@/assets/img/explore-3.jpg"
            class="object-cover w-full h-full"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
