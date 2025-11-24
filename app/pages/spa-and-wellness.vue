<script lang="ts" setup>
interface SpaPackage {
  title: string;
  description: string;
  openingHours: string;
  url: string;
  image: string;
}

const data: SpaPackage[] = [
  {
    title: "Spa Treatments",
    description:
      "Discover deep relaxation with our signature Balinese spa rituals. From gentle massages to revitalizing body treatments, each session is designed to calm your nervous system and nourish your well-being using natural, locally sourced ingredients.",
    openingHours: "09:00 - 18:00",
    url: "#",
    image: "/img/spa/1.jpg",
  },
  {
    title: "Yoga & Meditation",
    description:
      "Awaken your senses with guided yoga and meditation sessions in our open-air pavilion. Whether you're a beginner or an experienced practitioner, the peaceful surroundings of Sarva offer the perfect backdrop for mindful movement and breathwork.",
    openingHours: "09:00 - 18:00",
    url: "#",
    image: "/img/spa/2.jpg",
  },
];
</script>

<template>
  <section class="relative pt-24 pb-16 min-h-[520px]">
    <img
      src="@/assets/img/spa-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 2xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-latin text-[64px]">Spa & Wellness</h2>
      <p class="text-xl mt-4">
        Sarva offers curated wellness experiences to help you reconnect and
        restore balance in body, mind, and soul.
      </p>
    </div>
  </section>
  <section
    class="pt-32 pb-26 text-black container px-5 2xl:px-0 mx-auto max-w-[1256px] flex gap-16 items-center relative"
  >
    <div class="w-full">
      <h3 class="italic font-latin font-medium text-[32px]">
        Ubud Spa Sanctuary: A Journey to Bliss
      </h3>
      <div class="mt-3">
        <p class="">
          Step into a sanctuary of serenity nestled within our lush private
          villa grounds. Our exclusive Ubud Spa offers an escape from the
          everyday, focusing on holistic healing and authentic Balinese wellness
          traditions. Pamper yourself with a signature massage or a bespoke
          treatment designed to harmonize body and mind, as our professional
          therapists use natural local ingredients to promote deep relaxation.
        </p>
        <p class="mt-6">
          Tucked near the restaurant area, our intimate Spa Sanctuary invites
          you to unwind before or after your meal. Enjoy a quick, restorative
          massage or indulge in a longer treatment surrounded by the gentle
          sounds of nature.
        </p>
        <p class="mt-6">
          Book your session to achieve complete tranquility and leave feeling
          utterly renewed.
        </p>
      </div>
    </div>
    <div class="max-w-[580px] h-[650px] w-full">
      <img
        src="@/assets/img/spa.jpg"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
  </section>
  <section
    v-for="item in data"
    class="py-16 text-black container px-5 2xl:px-0 mx-auto max-w-[1256px] flex gap-16 items-center"
  >
    <div class="max-w-[580px] h-[400px] w-full">
      <img :src="item.image" class="w-full h-full object-cover" alt="" />
    </div>
    <div class="w-full">
      <h3 class="italic font-latin font-medium text-[32px]">
        {{ item.title }}
      </h3>
      <p class="mt-4">{{ item.description }}</p>
      <p class="text-black/50 mt-4">Opening Hours:</p>
      <p class="text-xl">{{ item.openingHours }}</p>
      <div class="flex gap-4 mt-8">
        <NuxtLink
          to="#"
          class="w-full bg-primary border-2 border-primary text-white font-medium text-center px-10 py-3 mt-7 cursor-pointer hover:bg-primary-darker transition-colors ease-out"
          >Make Reservation</NuxtLink
        >
        <NuxtLink
          to="#"
          class="w-full bg-white border-2 border-primary text-primary font-medium text-center px-10 py-3 mt-7 cursor-pointer hover:bg-primary hover:text-white transition-colors ease-out"
          >View Details</NuxtLink
        >
      </div>
    </div>
  </section>
  <OtherFacilities />
  <CTASection />
</template>
