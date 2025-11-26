<script lang="ts" setup>
interface Destination {
  title: string;
  description: string;
  image: string;
}

const data: Destination[] = [
  {
    title: "Campuhan Ridge Walk: Ubud's Natural Beauty",
    description:
      "Escape to the stunning Campuhan Ridge Walk. Stroll along the winding path, surrounded by lush green hills and breathtaking valley views. Perfect for a peaceful morning walk or sunset. Capture unforgettable photos and reconnect with nature, your serene Ubud retreat.",
    image: "/img/destination/1.jpg",
  },
  {
    title: "Experience Divine Serenity at Tirta Empul Temple",
    description:
      "Bathe in the sacred waters of Tirta Empul, Bali's revered holy water temple. Witness the stunning Balinese architecture and participate in the purification ritual (melukat). Find spiritual cleansing and deep tranquility. It’s a truly unforgettable cultural journey.",
    image: "/img/destination/2.jpg",
  },
  {
    title: "Goa Gajah Temple: Unveil the Elephant Cave Mystery",
    description:
      "Explore the ancient wonders of Goa Gajah (Elephant Cave). Pass through the intimidating, intricately carved mouth of the cave. Discover the bathing pools (petirtaan) and Hindu relics. A profound journey into Balinese history and spirituality. Step back in time!",
    image: "/img/destination/3.jpg",
  },
  {
    title: "Saraswati Temple: A Sanctuary of Art and Beauty",
    description:
      "Discover the enchanting Pura Taman Saraswati. Admire the intricate Balinese carvings and the stunning lotus pond that frames the entrance. Dedicated to the Goddess of Knowledge and Arts, this temple offers a peaceful, artistic escape, a must-see cultural gem in Ubud.",
    image: "/img/destination/4.jpg",
  },
  {
    title: "Tegallalang Rice Terrace: Iconic Balinese Landscape",
    description:
      "Witness the breathtaking, cascading Tegallalang Rice Terrace. It’s marvel at the traditional subak irrigation system that carves stunning green patterns into the valley. Take unforgettable photos, stroll the vibrant paddies, and experience the heart of Balinese agriculture.",
    image: "/img/destination/5.jpg",
  },
  {
    title: "Ubud Monkey Forest: Nature and Wildlife Adventure",
    description:
      "Step into the lush, mystical sanctuary of the Ubud Monkey Forest. Observe hundreds of playful, free-roaming long-tailed macaques in their natural habitat. Explore the ancient temples and towering trees. It’s a wild and unforgettable experience for all ages!",
    image: "/img/destination/6.jpg",
  },
];
</script>

<template>
  <section class="relative pt-20 pb-16 min-h-[520px]">
    <img
      src="@/assets/img/destination-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 2xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[64px]">Nearby Destinations</h2>
      <p class="text-xl mt-4">
        Sarva offers curated wellness experiences to help you reconnect and
        restore balance in body, mind, and soul.
      </p>
    </div>
  </section>
  <section class="py-46 text-black container px-5 2xl:px-0 mx-auto max-w-7xl">
    <ul class="">
      <li
        v-for="(item, idx) in data"
        :key="idx"
        class="grid grid-cols-2 gap-x-16 items-center relative not-first:mt-20"
      >
        <div
          class="w-full relative min-h-[500px]"
          :class="idx % 2 === 1 ? 'order-2' : 'order-1'"
        >
          <img :src="item.image" alt="" class="object-cover w-full h-full" />
        </div>

        <div :class="idx % 2 === 1 ? 'order-1' : 'order-2'">
          <p
            class="font-serif text-[42px] mt-4 leading-[42px] italic text-sarva-green"
          >
            {{ item.title }}
          </p>

          <p class="mt-4 max-w-[550px]">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </section>
  <CTASection />
</template>
