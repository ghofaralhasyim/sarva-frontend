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

const isMobile = ref(false);
const dropdownOpen = ref(false);

function selectDropdown(index: number) {
  dropdownOpen.value = false;
  changeTab(index);
}

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768; // MD breakpoint
  };

  checkMobile();

  window.addEventListener("resize", checkMobile);

  if (sliderRef.value) {
    slider = new KeenSlider(sliderRef.value, {
      loop: true,
      slides: { perView: 2.3, spacing: 8 },
      breakpoints: {
        "(min-width: 768px)": {
          slides: {
            perView: 5,
            spacing: 10,
          },
        },
      },
    });
  }
});

watch(activeTab, () => {
  setTimeout(() => {
    slider?.update();
  }, 50);
});

const { $gsap } = useNuxtApp();

onMounted(() => {
  const tl = $gsap.timeline();
  tl.fromTo("#t1", { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
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
      id="t1"
      class="container min-h-[520px] px-5 mx-auto max-w-[900px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[52px] lg:text-[64px] font-bold">Gallery</h2>
      <p class="lg:text-xl mt-4">
        Step into our Gallery and visually experience the beauty of our property
        and location. Browse stunning images of our pools, tranquil river views,
        and luxurious spaces. See what awaits you—your perfect getaway captured
        in every photo. Start your journey here.
      </p>
    </div>
  </section>

  <section
    class="pt-20 lg:pt-26 pb-32 lg:pb-42 text-black container px-5 mx-auto max-w-324"
  >
    <!-- MOBILE CUSTOM DROPDOWN -->
    <div class="relative block md:hidden mt-8">
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="w-full border-2 border-primary text-white bg-primary font-medium px-4 py-3 flex justify-between items-center"
      >
        {{ data[activeTab]?.name }}
        <svg
          :class="dropdownOpen ? 'rotate-180' : ''"
          class="w-5 h-5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown panel -->
      <ul
        v-if="dropdownOpen"
        class="absolute left-0 right-0 mt-2 bg-white border border-primary shadow-md z-20"
      >
        <li
          v-for="(item, idx) in data"
          :key="idx"
          @click="selectDropdown(idx)"
          class="px-4 py-3 cursor-pointer hover:bg-primary hover:text-white transition-colors"
          :class="{
            'bg-primary text-white': activeTab === idx,
            'text-primary': activeTab !== idx,
          }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- DESKTOP: TABS -->
    <ul class="hidden md:flex items-center justify-center gap-4">
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
    <div
      class="w-full h-[280px] lg:h-[650px] overflow-hidden mb-4 mt-8 lg:mt-10"
    >
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
        class="keen-slider__slide max-w-60 h-[100px] lg:h-[140px] cursor-pointer"
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
