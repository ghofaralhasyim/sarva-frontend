<script lang="ts" setup>
interface Villa {
  title: string;
  subTitle: string;
  description: string;
  size: string;
  bed: string[];
  guest: string;
  facilities: string;
  image: string;
}

const villas: Villa[] = [
  {
    title: "One-Bedroom",
    subTitle: "Private Pool Villa",
    description:
      "Designed for couples seeking privacy and peace, this villa features a soothing interior, a private pool, and calming views of Ubud’s lush surroundings.",
    size: "224 sqm",
    bed: ["Queen-size Bed (180cm x 200cm)"],
    guest: "2 Adults",
    facilities: "Private Garden & Pool",
    image: "img/villas/1.jpg",
  },
  {
    title: "Two Bedroom",
    subTitle: "Private Pool Villa",
    description:
      "This spacious and serene villa offers two comfortable bedrooms, warm modern design, and a shared living space ideal for slow mornings and relaxed evenings.",
    size: "347 sqm",
    bed: ["King-size Bed (200cm x 200cm)"],
    guest: "4 Adults",
    facilities: "Private Garden & Pool",
    image: "img/villas/2.jpg",
  },
  {
    title: "Three-Bedroom",
    subTitle: "Private Pool Villa",
    description:
      "This spacious and serene villa offers two comfortable bedrooms, warm modern design, and a shared living space ideal for slow mornings and relaxed evenings.",
    size: "347 sqm",
    bed: [
      "2 x King-size Bed (200cm x 200cm)",
      "1 x Queen-size Bed (180cm x 200cm)",
    ],
    guest: "4 Adults",
    facilities: "Private Garden & Pool",
    image: "img/villas/2.jpg",
  },
];
</script>

<template>
  <section class="relative py-20 min-h-[520px]">
    <img
      src="@/assets/img/villas-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 2xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-latin text-[64px]">Our Villas</h2>
      <p class="text-xl mt-4">
        Each villa at Sarva is thoughtfully designed to bring you closer to
        Ubud’s serene beauty — with warm touches, soft luxury, and complete
        privacy.
      </p>
    </div>
  </section>
  <section class="py-46 text-black container px-5 2xl:px-0 mx-auto max-w-7xl">
    <ul class="flex flex-col gap-24">
      <li
        v-for="(item, index) in villas"
        :key="index"
        class="grid grid-cols-2 gap-12"
      >
        <div class="w-full relative min-h-[500px]">
          <img :src="item.image" alt="" class="object-cover w-full h-full" />
        </div>
        <div class="w-full">
          <p class="font-latin text-[42px] mt-4 leading-[42px]">
            <span>{{ item.title }}</span>
            <span class="font-sans text-[24px] ml-4">{{ item.subTitle }}</span>
          </p>
          <p class="mt-4 max-w-[550px]">
            {{ item.description }}
          </p>
          <div class="grid grid-cols-6 mt-8 gap-y-8">
            <div class="col-span-2 flex flex-col gap-2">
              <p class="text-black/50">Size</p>
              <p class="text-xl">{{ item.size }}</p>
            </div>
            <div class="col-span-4 flex flex-col gap-2">
              <p class="text-black/50">Bed</p>
              <div class="flex flex-col gap-1">
                <p
                  v-for="(bed, index) in item.bed"
                  :key="index"
                  class="text-xl"
                >
                  {{ bed }}
                </p>
              </div>
            </div>
            <div class="col-span-2 flex flex-col gap-2">
              <p class="text-black/50">Guest</p>
              <p class="text-xl">{{ item.guest }}</p>
            </div>
            <div class="col-span-2 flex flex-col gap-2">
              <p class="text-black/50">Facilities</p>
              <p class="text-xl">{{ item.facilities }}</p>
            </div>
          </div>
          <div class="flex gap-4 mt-8">
            <NuxtLink
              to="#"
              class="bg-primary border-2 border-primary text-white font-medium text-center px-10 py-2 mt-7 cursor-pointer hover:bg-primary-darker transition-colors ease-out"
              >Book Now</NuxtLink
            >
            <NuxtLink
              to="#"
              class="bg-white border-2 border-primary text-primary font-medium text-center px-10 py-2 mt-7 cursor-pointer hover:bg-primary hover:text-white transition-colors ease-out"
              >Show Details</NuxtLink
            >
          </div>
        </div>
      </li>
    </ul>
  </section>
  <CTASection />
</template>
