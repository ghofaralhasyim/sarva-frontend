<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import KeenSlider from "keen-slider";

interface Gallery {
  name: string;
  images: string[];
}

const data: Gallery[] = [
  {
    name: "Facilities",
    images: [
      "/img/villas/sliders/1.jpg",
      "/img/villas/sliders/2.jpg",
      "/img/villas/sliders/3.jpg",
      "/img/villas/sliders/4.jpg",
      "/img/villas/sliders/5.jpg",
    ],
  },
  {
    name: "Villas",
    images: [
      "/img/villas/sliders/1.jpg",
      "/img/villas/sliders/2.jpg",
      "/img/villas/sliders/3.jpg",
      "/img/villas/sliders/4.jpg",
      "/img/villas/sliders/5.jpg",
    ],
  },
  {
    name: "Dining",
    images: [
      "/img/villas/sliders/1.jpg",
      "/img/villas/sliders/2.jpg",
      "/img/villas/sliders/3.jpg",
      "/img/villas/sliders/4.jpg",
      "/img/villas/sliders/5.jpg",
    ],
  },
  {
    name: "Wellness",
    images: [
      "/img/villas/sliders/1.jpg",
      "/img/villas/sliders/2.jpg",
      "/img/villas/sliders/3.jpg",
      "/img/villas/sliders/4.jpg",
      "/img/villas/sliders/5.jpg",
    ],
  },
  {
    name: "Events",
    images: [
      "/img/villas/sliders/1.jpg",
      "/img/villas/sliders/2.jpg",
      "/img/villas/sliders/3.jpg",
      "/img/villas/sliders/4.jpg",
      "/img/villas/sliders/5.jpg",
    ],
  },
];

const activeTab = ref(0);
const activeImage = ref<string>(data[0]?.images?.[0] ?? "");

function changeTab(index: number) {
  const gallery = data[index];
  activeTab.value = index;
  activeImage.value = gallery?.images?.[0] ?? "";
}

function selectImage(img: string) {
  activeImage.value = img;
}

const currentImages = computed(() => data[activeTab.value]?.images ?? []);

const sliderRef = ref<HTMLElement | null>(null);
let slider: any = null;

onMounted(() => {
  if (sliderRef.value) {
    slider = new KeenSlider(sliderRef.value, {
      loop: true,
      slides: { perView: 5, spacing: 10 },
    });
  }
});

watch(activeTab, () => {
  setTimeout(() => {
    slider?.update();
  }, 50);
});
</script>

<template>
  <section class="relative py-20 min-h-[520px]">
    <img
      src="@/assets/img/gallery-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 mx-auto max-w-[900px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[64px]">Gallery</h2>
      <p class="text-xl mt-4">
        Step into our Gallery and visually experience the beauty of our property
        and location. Browse stunning images of our pools, tranquil river views,
        and luxurious spaces. See what awaits you—your perfect getaway captured
        in every photo. Start your journey here.
      </p>
    </div>
  </section>

  <section class="pt-26 pb-42 text-black container px-5 mx-auto max-w-7xl">
    <ul class="flex items-center justify-center gap-4">
      <li v-for="(item, idx) in data" :key="idx">
        <button
          @click="changeTab(idx)"
          class="border-2 font-medium text-center px-14 py-2 mt-7 cursor-pointer transition-colors ease-out"
          :class="{
            'bg-primary text-white border-primary': activeTab === idx,
            'bg-white text-primary border-primary hover:bg-primary hover:text-white':
              activeTab !== idx,
          }"
        >
          {{ item.name }}
        </button>
      </li>
    </ul>

    <!-- MAIN IMAGE -->
    <div class="w-full h-[650px] overflow-hidden mb-4 mt-10">
      <img
        :src="activeImage"
        class="w-full h-full object-cover transition-all duration-300"
        alt="Main Villa Image"
      />
    </div>

    <!-- THUMBNAILS -->
    <div ref="sliderRef" class="keen-slider">
      <div
        v-for="(img, index) in currentImages"
        :key="index"
        class="keen-slider__slide max-w-60 h-[140px] cursor-pointer"
        @click="selectImage(img)"
      >
        <img
          :src="img"
          class="w-full h-full object-cover border-2 transition"
          :class="{
            'border-primary': activeImage === img,
            'border-transparent hover:border-black': activeImage !== img,
          }"
          alt=""
        />
      </div>
    </div>
  </section>
  <CTASection />
</template>
