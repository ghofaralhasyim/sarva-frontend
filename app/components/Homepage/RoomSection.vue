<script lang="ts" setup>
import KeenSlider from "keen-slider";
import type { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";

interface Villa {
  title: string;
  subTitle: string;
  space: number;
  capacity: number;
  bedType: string;
  pool: string;
  description: string;
  features: string[];
  url: string;
  image: string;
  slug: string;
  amenities: string[];
  images: string[];
}

const villasData: Villa[] = [
  {
    title: "One-Bedroom Private Pool Villa",
    subTitle:
      "Perfect for families or friends, these spacious villas offer comfort and connection.",
    space: 224,
    capacity: 2,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description:
      "<p>Escape to your intimate Ubud sanctuary! Our One-Bedroom Villa features a plush double bed and a sparkling private pool just steps from your door. Enjoy cozy meals in the dining area with kitchenette. The luxurious bathroom is a retreat with an air-conditioned bathtub for the ultimate soak.</p>",
    features: [
      "Private swimming pool with tropical surroundings",
      "Elegant single bedroom with premium bedding",
      "Open-plan living area with natural lighting",
      "Outdoor dining space and fully-equipped kitchenette",
      "Spacious wooden deck with sun-loungers",
      "Floor-to-ceiling windows with garden views",
      "En-suite bathroom with modern fixtures",
      "Soothing interior design inspired by Balinese elements",
      "Full air-conditioning for indoor comfort",
    ],
    url: "#",
    image: "/img/villas/1.jpg",
    slug: "one-bedroom-private-pool-villa",
    amenities: [
      "A Spacious bed, sleep for 2 persons",
      "Hair dryer",
      "Aromatic room refreshment",
      "Refrigerator with Minibar items",
      "Individual Controlled Air conditioning",
      "Safety box",
      "Bathroom with shower & separate bathtub",
      "Sofa",
      "50-inch smart LED TV",
      "Laundry bag",
      "Private pool",
      "Room Signages",
      "Wi-Fi",
      "Mosquito repellent",
      "Sun deck with pool’s chair and umbrella",
      "Room service",
      "Wardrobe",
      "Umbrella",
      "Kitchenette with pantry",
      "In-room phone",
      "Slippers",
      "Writing desk with chair",
      "Dining table",
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  },
  {
    title: "Two-Bedroom Private Pool Villa",
    subTitle:
      "Perfect for couples or solo travelers, these 15 exclusive units offer privacy and serenity. Indulge in pure Balinese bliss.",
    space: 224,
    capacity: 2,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description: `
        <p>Unwind with family or friends in our spacious Two-Bedroom Villa. With only 3 units available, secure your perfect group getaway. Each villa boasts a large private pool and a shared dining area with kitchenette for easy entertaining. Both bedrooms feature a comfortable double bed. </p>
        <p class="mt-4">After a day exploring, relax in the elegant bathroom, complete with an air-conditioned bathtub. Experience luxury and togetherness in your private Ubud residence.</p>
    `,
    features: [
      "Private swimming pool with tropical surroundings",
      "Elegant single bedroom with premium bedding",
      "Open-plan living area with natural lighting",
      "Outdoor dining space and fully-equipped kitchenette",
      "Spacious wooden deck with sun-loungers",
      "Floor-to-ceiling windows with garden views",
      "En-suite bathroom with modern fixtures",
      "Soothing interior design inspired by Balinese elements",
      "Full air-conditioning for indoor comfort",
    ],
    url: "#",
    image: "/img/villas/2.jpg",
    slug: "two-bedroom-private-pool-villa",
    amenities: [
      "A Spacious bed, sleep for 2 persons",
      "Hair dryer",
      "Aromatic room refreshment",
      "Refrigerator with Minibar items",
      "Individual Controlled Air conditioning",
      "Safety box",
      "Bathroom with shower & separate bathtub",
      "Sofa",
      "50-inch smart LED TV",
      "Laundry bag",
      "Private pool",
      "Room Signages",
      "Wi-Fi",
      "Mosquito repellent",
      "Sun deck with pool’s chair and umbrella",
      "Room service",
      "Wardrobe",
      "Umbrella",
      "Kitchenette with pantry",
      "In-room phone",
      "Slippers",
      "Writing desk with chair",
      "Dining table",
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  },
  {
    title: "Three-Bedroom Private Pool Villa",
    subTitle:
      "Perfect for large families or groups seeking unparalleled space and exclusivity.",
    space: 224,
    capacity: 2,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description: `
        <p>Experience the pinnacle of luxury in our singular Three-Bedroom Villa. This one-of-a-kind residence is your grand home away from home. Gather around the expansive private pool or share meals in the large dining area with kitchenette. Each of the three bedrooms has a double bed for ultimate comfort.</p>
        <p class="mt-4">The master bathroom features a lavish air-conditioned bathtub. Perfect for large families or groups seeking unparalleled space and exclusivity.</p>
    `,
    features: [
      "Private swimming pool with tropical surroundings",
      "Elegant single bedroom with premium bedding",
      "Open-plan living area with natural lighting",
      "Outdoor dining space and fully-equipped kitchenette",
      "Spacious wooden deck with sun-loungers",
      "Floor-to-ceiling windows with garden views",
      "En-suite bathroom with modern fixtures",
      "Soothing interior design inspired by Balinese elements",
      "Full air-conditioning for indoor comfort",
    ],
    url: "#",
    image: "/img/villas/3.jpg",
    slug: "three-bedroom-private-pool-villa",
    amenities: [
      "A Spacious bed, sleep for 2 persons",
      "Hair dryer",
      "Aromatic room refreshment",
      "Refrigerator with Minibar items",
      "Individual Controlled Air conditioning",
      "Safety box",
      "Bathroom with shower & separate bathtub",
      "Sofa",
      "50-inch smart LED TV",
      "Laundry bag",
      "Private pool",
      "Room Signages",
      "Wi-Fi",
      "Mosquito repellent",
      "Sun deck with pool’s chair and umbrella",
      "Room service",
      "Wardrobe",
      "Umbrella",
      "Kitchenette with pantry",
      "In-room phone",
      "Slippers",
      "Writing desk with chair",
      "Dining table",
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  },
];

const sliderRef = ref<HTMLElement | null>(null);
let slider: KeenSliderInstance | null = null;
const totalSlides = villasData.length;
const currentSlide = ref(0);

onMounted(() => {
  if (sliderRef.value) {
    slider = new KeenSlider(sliderRef.value, {
      loop: false,
      slides: {
        perView: 1,
        spacing: 20,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: {
            perView: 1,
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
      slideChanged(sliderInstance) {
        currentSlide.value = sliderInstance.track.details.rel;
      },
    });
  }
});

const goToSlide = (i: number) => {
  slider?.moveToIdx(i);
};
</script>

<template>
  <section
    class="pt-12 pb-40 lg:pb-46 text-black container px-5 2xl:px-0 mx-auto max-w-7xl"
  >
    <h2 class="font-serif text-[36px] lg:text-[40px] font-medium">
      Welcomed by Culture, Surrounded by Serenity
    </h2>
    <p class="max-w-[680px] lg:text-xl mt-6 lg:mt-4">
      Our central Ubud villa is your gateway to exploration. Upon arrival,
      you’ll be welcomed by our charming lobby, designed in the traditional
      joglo Javanese house style, while each villa unit comes with modern
      minimalist grandeur and bijou garden.
    </p>
    <ul ref="sliderRef" class="keen-slider mt-16 lg:mt-8">
      <li
        v-for="(item, idx) in villasData"
        :key="idx"
        class="relative keen-slider__slide"
      >
        <div class="h-[250px] lg:h-[400px] lg:aspect-square lg:min-h-[400px]">
          <img
            :src="item.image"
            :alt="item.title"
            class="object-cover w-full h-full"
          />
        </div>
        <p class="font-serif text-[28px] mt-6 lg:mt-4">
          {{ item.title }}
        </p>
        <p class="mt-3">
          {{ item.subTitle }}
        </p>
        <ul class="flex flex-col gap-4 mt-6">
          <li class="flex gap-5">
            <img
              src="@/assets/img/icon/square.png"
              class="aspect-square w-6 h-6"
              alt=""
            />
            <span>{{ item.space }} sqm</span>
          </li>
          <li class="flex gap-5">
            <img
              src="@/assets/img/icon/bed.png"
              class="aspect-square w-6 h-6"
              alt=""
            />
            <span>{{ item.bedType }}</span>
          </li>
          <li class="flex gap-5">
            <img
              src="@/assets/img/icon/pool.png"
              class="aspect-square w-6 h-6"
              alt=""
            />
            <span>{{ item.pool }}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="flex justify-center gap-3 mt-6 md:hidden">
      <button
        v-for="i in totalSlides"
        :key="i"
        @click="goToSlide(i - 1)"
        class="w-full h-2 transition-all duration-300"
        :class="currentSlide === i - 1 ? 'bg-primary' : 'bg-[#D9D9D9]'"
      ></button>
    </div>
  </section>
</template>
