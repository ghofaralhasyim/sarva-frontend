<script lang="ts" setup>
interface RestaurantPackage {
  title: string;
  description: string;
  includes: string[];
  url: string;
  image: string;
}

const data: RestaurantPackage[] = [
  {
    title: "Romantic Dinner Package",
    description:
      "Celebrate love with a candlelit private dinner set up in your villa or by the pool. Enjoy a three-course chef-prepared meal paired with wine and floral touches for a memorable evening.",
    includes: [
      "Private dining setup with candles and flowers",
      "Three-course set menu",
      "One bottle of wine",
    ],
    url: "#",
    image: "/img/resto/2.jpg",
  },
  {
    title: "Floating Breakfast Experience",
    description:
      "Enjoy a beautifully arranged breakfast served on a floating tray in your private pool. A luxurious and photogenic way to welcome the morning in Ubud.",
    includes: [
      "Selection of Western or Indonesian breakfast",
      "Fresh juice, coffee or tea",
      "Served in-villa pool with floral décor",
    ],
    url: "#",
    image: "/img/resto/3.jpg",
  },
  {
    title: "Balinese Cooking Experience",
    description:
      "Learn to prepare traditional Balinese dishes with guidance from our local chef. A hands-on, fun, and flavorful way to immerse in Bali’s rich culinary heritage.",
    includes: [
      "Cooking class with fresh ingredients",
      "Lunch or dinner tasting",
      "Recipe cards to take home",
    ],
    url: "#",
    image: "/img/resto/4.jpg",
  },
];

const { $gsap } = useNuxtApp();

onMounted(() => {
  const tl = $gsap.timeline();
  tl.fromTo("#t1", { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
});
</script>

<template>
  <section class="relative pt-24 pb-16 min-h-[520px]">
    <img
      src="@/assets/img/resto-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      id="t1"
      class="container min-h-[520px] px-5 xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[52px] lg:text-[64px] font-bold">
        Restaurant
      </h2>
      <p class="text-sm lg:text-base mt-4">
        Savor a thoughtfully prepared selection of local and international
        cuisine, made with fresh, seasonal ingredients.
      </p>
    </div>
  </section>
  <section
    class="pt-28 lg:pt-32 pb-26 text-black container px-5 xl:px-0 mx-auto max-w-324 flex flex-col lg:flex-row gap-16 items-center relative"
  >
    <div class="w-full">
      <h3
        class="font-serif text-[36px] leading-[36px] lg:leading-[40px] lg:text-[40px] text-sarva-green font-medium tracking-tight"
      >
        An Oasis of Flavor and Serenity
      </h3>
      <div class="mt-7 text-sm lg:text-base font-sans">
        <p class="">
          Imagine savoring exquisite cuisine while overlooking a lush valley
          shaped by the gentle Oos River. At Sarva Resto Ubud, every meal is a
          sensory journey, blending natural beauty with refined luxury.
        </p>
        <p class="mt-6">
          Set beside our shimmering main pool and surrounded by terraced rice
          fields, the restaurant blends natural beauty with refined luxury.
          Enjoy a soothing jacuzzi soak or a tropical cocktail from the nearby
          bar before or after your meal.
        </p>
        <p class="mt-6">
          Whether for a special celebration or a quiet escape, Sarva Resto
          offers the perfect mix of Balinese charm, breathtaking views, and
          culinary excellence.
        </p>
      </div>
    </div>
    <div class="max-w-[580px] h-[250px] lg:h-[650px] w-full">
      <img
        src="@/assets/img/resto.jpg"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
  </section>
  <section
    v-for="item in data"
    class="py-16 text-black container px-5 xl:px-0 mx-auto max-w-324 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
  >
    <div class="max-w-[646px] h-[400px] w-full">
      <img :src="item.image" class="w-full h-full object-cover" alt="" />
    </div>
    <div class="w-full">
      <h3
        class="font-serif text-[36px] lg:text-[48px] text-sarva-green font-medium tracking-tight italic"
      >
        {{ item.title }}
      </h3>
      <p class="mt-4">{{ item.description }}</p>
      <p class="text-black/50 mt-4">Includes</p>
      <ul class="list-disc pl-5 mt-3 font-sans italic text-xl leading-[30px]">
        <li v-for="y in item.includes" class="">{{ y }}</li>
      </ul>
      <div class="flex gap-4 mt-4 lg:mt-8">
        <NuxtLink
          :to="item.url"
          class="w-full bg-primary border-2 border-primary text-white font-medium text-center lg:w-[220px] py-2 mt-7 cursor-pointer hover:bg-primary-darker transition-colors ease-out"
          >Make Reservation</NuxtLink
        >
        <NuxtLink
          :to="item.url"
          class="w-full bg-white border-2 border-primary text-primary font-medium text-center lg:w-[220px] py-2 mt-7 cursor-pointer hover:bg-primary hover:text-white transition-colors ease-out"
          >View Menu</NuxtLink
        >
      </div>
    </div>
  </section>
  <OtherFacilities />
  <CTASection />
</template>
