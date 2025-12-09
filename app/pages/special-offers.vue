<script lang="ts" setup>
interface SpecialOffers {
  title: string;
  description: string;
  image: string;
  url: string;
}

const data: SpecialOffers[] = [
  {
    title: "The Ubud Honeymoon: Where Your Forever Begins",
    description: `
        <p>Wake up in your private villa surrounded by rice terraces, unwind with a couples’ massage by the river, and dine beneath the stars. Every romantic detail is taken care of, from airport transfers to daily surprises.</p>
        <p class="mt-4">Ubud is a sanctuary of peace and love. Let the tranquility of the jungle deepen your connection and celebrate the start of your journey together. Book your unforgettable Balinese escape now.</p>
    `,
    image: "img/offers/1.jpg",
    url: "#",
  },
  {
    title: "Flash Deal: Your Private Ubud Villa Awaits!",
    description: `
        <p>Dreaming of a Bali villa escape without the high price tag? Make it a reality with our Flash Deal Villa Package!</p>
        <p class="mt-4">For a minimal 1-Night Stay, unlock luxury at an unbeatable price. Experience the peace of your own private sanctuary, complete with lush surroundings and the famed Ubud tranquility. It's the perfect instant reset! Don't wait—this exclusive rate allows you to indulge affordably. </p>
    `,
    image: "img/offers/2.jpg",
    url: "#",
  },
  {
    title: "Urgent Bliss: Last-Minute Ubud Villa Steal!",
    description: `
        <p>Impulse travelers, this is your moment! Secure a stunning private Ubud Villa tonight with our exclusive Last-Minute Deal. Why settle for a room when you can have a sanctuary?</p>
        <p class="mt-4">Enjoy the luxury of a private escape, lush views, and instant tranquility for a minimal 1-Night Stay. We've slashed prices to fill our remaining villas, meaning huge savings for you.</p>
    `,
    image: "img/offers/3.jpg",
    url: "#",
  },
  {
    title: "Ubud-Jimbaran Combined Stay Package",
    description: `
        <p>Discover the essence of Bali with our exclusive combined stay package, uniting the cultural charm of Ubud (Sarva Ubud Villa) and the coastal allure of Jimbaran (Lumbini Luxury Villas & Spa). Begin your journey amidst Ubud’s lush hills, surrounded by art, tradition, and tranquility. Then move to Jimbaran’s golden sands to unwind beneath breathtaking sunsets.</p>
        <p class="mt-4">Experience two unforgettable worlds of Bali in one seamless retreat.</p>
    `,
    image: "img/offers/4.jpg",
    url: "#",
  },
];
</script>

<template>
  <section class="relative py-20 min-h-[520px]">
    <img
      src="@/assets/img/offers-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[52px] lg:text-[64px] font-bold">
        Special Offers
      </h2>
      <p class="text-lg lg:text-xl mt-4">
        Discover exclusive offers and limited-time deals to make your Ubud
        getaway even more memorable. Enjoy added value, special rates, and
        unforgettable experiences at Sarva Ubud Villa.
      </p>
    </div>
  </section>
  <section
    class="py-32 lg:py-46 text-black container px-5 xl:px-0 mx-auto max-w-324"
  >
    <ul class="flex flex-col gap-24">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="grid lg:grid-cols-2 gap-8 lg:gap-12"
      >
        <div class="w-full relative min-h-[410px]">
          <img :src="item.image" alt="" class="object-cover w-full h-full" />
        </div>
        <div class="w-full">
          <h2
            class="font-serif text-[36px] lg:text-[42px] mt-2 lg:mt-4 leading-[42px] italic font-medium text-sarva-green"
          >
            {{ item.title }}
          </h2>

          <div class="mt-6 max-w-[550px]" v-html="item.description"></div>

          <div class="flex gap-4 mt-4 lg:mt-8">
            <NuxtLink
              :to="item.url"
              class="w-full bg-primary border-2 border-primary text-white font-medium text-center lg:w-[220px] py-2 mt-7 cursor-pointer hover:bg-primary-darker transition-colors ease-out"
              >Book Now</NuxtLink
            >
            <NuxtLink
              :to="item.url"
              class="w-full bg-white border-2 border-primary text-primary font-medium text-center lg:w-[220px] py-2 mt-7 cursor-pointer hover:bg-primary hover:text-white transition-colors ease-out"
              >View Details</NuxtLink
            >
          </div>
        </div>
      </li>
    </ul>
  </section>
  <CTASection />
</template>
