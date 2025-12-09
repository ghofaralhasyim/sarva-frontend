<script lang="ts" setup>
interface Facilities {
  name: string;
  description: string;
  operationHours: string;
  image: string;
  slug: string;
}

const facilities: Facilities[] = [
  {
    name: "Lobby Lounge",
    description:
      "Escape the bustle at Lobby Lounge. Unwind with a refreshing drink while awaiting your room, or relax after check-out. It’s your tranquil oasis for rest and relaxation, nestled discreetly behind the lobby. Settle in and recharge.",
    operationHours: "07:00 - 22:00",
    image: "img/facilities/lobby.jpg",
    slug: "lobby-lounge",
  },
  {
    name: "Restaurant",
    description:
      "Discover our hidden gem, tucked away behind the villa units. Enjoy exquisite cuisine and handcrafted cocktails with a stunning, tranquil view of the Oos River. It’s the perfect setting for a romantic dinner or a peaceful evening escape. Taste the tranquility.",
    operationHours: "07:00 - 20:00",
    image: "img/facilities/resto.jpg",
    slug: "restaurant",
  },
  {
    name: "Green Valley View Infinity Pool",
    description:
      "Five into our main pool and soak in the jacuzzi, offering breathtaking, uninterrupted views of the lush green valley and the serene Oos River. This is your stunning oasis for ultimate relaxation. Enjoy a swim and let the natural beauty refresh your soul.",
    operationHours: "07:00 - 19:00",
    image: "img/facilities/pool.jpg",
    slug: "green-valley-view-infinity-pool",
  },
  {
    name: "Fitness Center",
    description:
      "Find your power at our state-of-the-art fitness center, conveniently located just behind the lobby. Get a refreshing workout before your day begins or after a long flight. Fully equipped with modern machines to help you stay on track. Your daily boost awaits!",
    operationHours: "07:00 - 19:00",
    image: "img/facilities/gym.jpg",
    slug: "fitness-center",
  },
  {
    name: "Spa & Wellness",
    description:
      "Relax and recharge at our intimate Spa Sanctuary, just steps away from your villa. Enjoy traditional Balinese massages and rejuvenating treatments designed to restore balance.",
    operationHours: "09:00 - 18:00",
    image: "img/facilities/spa.jpg",
    slug: "spa-and-wellness",
  },
  {
    name: "Tour Desk",
    description:
      "Discover the best of Bali with ease at our Tour Desk. From thrilling adventures to cultural journeys, we’ll plan every detail so you can simply enjoy the experience.",
    operationHours: "09:00 - 18:00",
    image: "img/facilities/tour.jpg",
    slug: "tour-desk",
  },
];

const route = useRoute();

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const dataOther: Facilities[] = getRandomItems(
  facilities.filter((item) => item.slug !== route.name),
  3
);
</script>

<template>
  <section class="relative pt-16 pb-46">
    <div class="container px-5 xl:px-0 mx-auto max-w-324">
      <h3 class="font-serif text-[36px] lg:text-[40px] mb-6 font-medium">
        Other Facilities
      </h3>
      <ul class="grid lg:grid-cols-3 gap-5 gap-y-20 lg:gap-y-0">
        <li v-for="item in dataOther" class="">
          <NuxtLink :to="`/${item.slug}`">
            <div class="w-full h-[405px] overflow-hidden">
              <img
                :src="item.image"
                class="w-full h-full object-cover"
                :alt="item.name"
              />
            </div>
            <h4 class="font-serif font-semibold text-[28px] my-4">
              {{ item.name }}
            </h4>
            <p class="lg:min-h-32 line-clamp-5">{{ item.description }}</p>
            <p class="mt-6 text-xl font-medium">
              Operation Hours: {{ item.operationHours }}
            </p>
            <div class="mt-10">
              <NuxtLink
                :to="`/${item.slug}`"
                class="bg-white border-2 border-primary text-primary font-medium text-center px-10 py-3 mt-7 cursor-pointer hover:bg-primary hover:text-white transition-colors ease-out"
                >View Details</NuxtLink
              >
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
