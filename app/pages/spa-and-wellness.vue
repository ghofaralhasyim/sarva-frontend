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
      class="container min-h-[520px] px-5 xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[52px] lg:text-[64px] font-bold">
        Spa & Wellness
      </h2>
      <p class="lg:text-xl mt-4 max-w-[320px] md:max-w-none">
        Sarva offers curated wellness experiences to help you reconnect and
        restore balance in body, mind, and soul.
      </p>
    </div>
  </section>
  <section
    class="pt-26 lg:pt-32 pb-20 lg:pb-26 text-black container px-5 xl:px-0 mx-auto max-w-324 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative"
  >
    <div class="w-full">
      <h3
        class="italic font-serif font-medium text-[32px] lg:text-[40px] text-sarva-green tracking-tight"
      >
        Ubud Spa Sanctuary: A Journey to Bliss
      </h3>
      <div class="mt-6 lg:mt-5 text-sm lg:text-base">
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
    <div class="max-w-[580px] h-[280px] lg:h-[650px] w-full">
      <img
        src="@/assets/img/spa.jpg"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
  </section>
  <section
    v-for="item in data"
    class="py-16 text-black container px-5 xl:px-0 mx-auto max-w-324 flex flex-col lg:flex-row gap-6 lg:gap-16 items-center"
  >
    <div class="max-w-[580px] h-[250px] lg:h-[400px] w-full">
      <img :src="item.image" class="w-full h-full object-cover" alt="" />
    </div>
    <div class="w-full">
      <h3
        class="italic font-serif font-medium text-[28px] lg:text-[32px] text-sarva-green"
      >
        {{ item.title }}
      </h3>
      <p class="mt-4 text-sm lg:text-base">
        {{ item.description }}
      </p>
      <div class="flex lg:flex-col mt-4 gap-2">
        <p class="font-sans text-lg lg:text-black/50">Opening Hours:</p>
        <p class="font-sans text-lg lg:text-xl">
          {{ item.openingHours }}
        </p>
      </div>
      <div class="flex gap-4 mt-6 lg:mt-8">
        <NuxtLink
          to="https://wa.me"
          class="w-fit bg-primary border-2 border-primary text-white font-medium text-center px-10 py-3 cursor-pointer hover:bg-primary-darker transition-colors ease-out"
          >Make Reservation</NuxtLink
        >
      </div>
    </div>
  </section>
  <OtherFacilities />
  <CTASection />
</template>
