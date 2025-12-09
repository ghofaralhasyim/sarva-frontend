<script lang="ts" setup>
import KeenSlider from "keen-slider";

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
      " Perfect for families or friends, these spacious villas offer comfort and connection.",
    space: 224,
    capacity: 2,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description: `<p class="leading-[25px]">Escape to your intimate Ubud sanctuary! Our One-Bedroom Villa features a plush double bed and a sparkling private pool just steps from your door. Enjoy cozy meals in the dining area with kitchenette. The luxurious bathroom is a retreat with an air-conditioned bathtub for the ultimate soak.</p>`,
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
    image: "/img/room-1-1.jpg",
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
        <p class="leading-[25px]">Unwind with family or friends in our spacious Two-Bedroom Villa. With only 3 units available, secure your perfect group getaway. Each villa boasts a large private pool and a shared dining area with kitchenette for easy entertaining. Both bedrooms feature a comfortable double bed. </p>
        <p class="mt-4 leading-[25px]">After a day exploring, relax in the elegant bathroom, complete with an air-conditioned bathtub. Experience luxury and togetherness in your private Ubud residence.</p>
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
    image: "/img/room-1-1.jpg",
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
        <p class="leading-[25px]">Experience the pinnacle of luxury in our singular Three-Bedroom Villa. This one-of-a-kind residence is your grand home away from home. Gather around the expansive private pool or share meals in the large dining area with kitchenette. Each of the three bedrooms has a double bed for ultimate comfort.</p>
        <p class="mt-4 leading-[25px]">The master bathroom features a lavish air-conditioned bathtub. Perfect for large families or groups seeking unparalleled space and exclusivity.</p>
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
    image: "/img/room-1-1.jpg",
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

const route = useRoute();
let dataIdx = villasData.findIndex((item) => item.slug == route.params.slug);
let data: Villa | undefined = undefined;
if (dataIdx != -1) {
  data = villasData[dataIdx];
}

const activeImage = ref(data?.images[0] || "1.jpg");
const sliderRef = ref<HTMLElement | null>(null);
let slider: typeof KeenSlider | null = null;

onMounted(() => {
  if (sliderRef.value) {
    slider = new KeenSlider(sliderRef.value, {
      loop: true,
      slides: { perView: 5, spacing: 10 },
    });
  }
});

function selectImage(img: string) {
  activeImage.value = img;
}
</script>

<template>
  <section class="relative pt-24 pb-16 min-h-[520px]">
    <img
      src="@/assets/img/villas-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      v-if="data"
      class="container min-h-[520px] px-5 xl:px-0 mx-auto max-w-[920px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[64px] font-bold">{{ data.title }}</h2>
      <p class="text-xl mt-6 text-center max-w-[680px]">
        {{ data.subTitle }}
      </p>
      <ul class="flex gap-12 mt-16">
        <li class="flex flex-col justify-center items-center">
          <div class="w-8 h-8 aspect-square">
            <img
              src="@/assets/img/icon/square-white.png"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <span>{{ data.space }} sqm</span>
        </li>
        <li class="flex flex-col justify-center items-center">
          <div class="w-[35px] h-[35px] aspect-square">
            <img
              src="@/assets/img/icon/users-white.png"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <span>{{ data.capacity }} Adults</span>
        </li>
        <li class="flex flex-col justify-center items-center">
          <div class="w-[35px] h-[35px] aspect-square">
            <img
              src="@/assets/img/icon/bed-white.png"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <span>{{ data.bedType }}</span>
        </li>
        <li class="flex flex-col justify-center items-center">
          <div class="w-[35px] h-[35px] aspect-square">
            <img
              src="@/assets/img/icon/pool-white.png"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <span>{{ data.pool }}</span>
        </li>
      </ul>
    </div>
  </section>
  <section
    class="py-36 text-black container px-5 xl:px-0 mx-auto max-w-324 flex gap-16 items-center"
  >
    <div class="max-w-[580px] h-[650px] w-full">
      <img
        src="@/assets/img/room-1.png"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
    <div class="w-full">
      <h3 class="italic font-serif font-semibold text-sarva-green text-[32px]">
        Description
      </h3>
      <div class="mt-3" v-html="data?.description"></div>
      <h3
        class="italic font-serif text-[32px] mt-14 font-semibold text-sarva-green"
      >
        Villa Features
      </h3>
      <ul class="list-disc pl-5 mt-3">
        <li v-for="item in data?.features" class="">{{ item }}</li>
      </ul>
      <div class="flex gap-4 mt-14">
        <NuxtLink
          to="#"
          class="w-full bg-primary border-2 border-primary text-white font-medium text-center px-10 py-3 mt-7 cursor-pointer hover:bg-primary-darker transition-colors ease-out"
          >Book Now</NuxtLink
        >
        <NuxtLink
          to="#"
          class="w-full bg-white border-2 border-primary text-primary font-medium text-center px-10 py-3 mt-7 cursor-pointer hover:bg-primary hover:text-white transition-colors ease-out"
          >Villa Terms & Conditions</NuxtLink
        >
      </div>
    </div>
  </section>
  <section class="pt-26 pb-32 bg-sarva-green text-white">
    <div class="container px-5 xl:px-0 mx-auto max-w-324">
      <h3 class="italic font-serif font-semibold text-[#D1B377] text-[40px]">
        Villa Amenities
      </h3>
      <ul class="grid grid-cols-4 gap-y-6 gap-x-8 mt-12">
        <li v-for="item in data?.amenities" class="">{{ item }}</li>
      </ul>
    </div>
  </section>
  <section
    class="py-36 text-black container px-5 xl:px-0 mx-auto max-w-324 relative"
  >
    <div class="w-full h-[650px] overflow-hidden mb-4">
      <img
        :src="`/img/villas/sliders/${activeImage}`"
        class="w-full h-full object-cover transition-all duration-300"
        alt="Main Villa Image"
      />
    </div>

    <div ref="sliderRef" class="keen-slider">
      <div
        v-for="(img, index) in data?.images"
        :key="index"
        class="keen-slider__slide max-w-60 h-[140px] cursor-pointer"
        @click="selectImage(img)"
      >
        <img
          :src="`/img/villas/sliders/${img}`"
          class="w-full h-full object-cover border-2 border-transparent hover:border-black transition"
          alt=""
        />
      </div>
    </div>
  </section>
  <CTASection />
</template>
