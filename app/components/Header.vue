<script lang="ts" setup>
const { $gsap, $lenis } = useNuxtApp();

const menus = [
  { text: "Villas", url: "/villas" },
  { text: "Facilities", url: "/services-and-facilities" },
  { text: "Wellness", url: "/spa-and-wellness" },
  { text: "Dining", url: "/restaurant" },
  { text: "Gallery", url: "/gallery" },
  { text: "Special Offers", url: "/special-offers" },
];

const showNav = () => {
  const tl = $gsap.timeline();
  tl.fromTo(
    "#nav",
    { opacity: 0, display: "flex" },
    { opacity: 1, duration: 0.3 },
    0
  )
    .to(".nav-item", { opacity: 1, duration: 0.3, delay: 0.3 }, 0)
    .to("#bgNav", { opacity: 1, duration: 0.3 }, 0);
};

const closeNav = () => {
  const tl = $gsap.timeline();
  tl.to(".nav-item", { opacity: 0, duration: 0.3 })
    .to("#bgNav", { opacity: 0, duration: 0.3 }, "<")
    .to("#nav", { opacity: 0, display: "none", duration: 0.3 });
};
</script>

<template>
  <header class="absolute top-0 left-0 w-full text-white z-9999 bg-transparent">
    <div
      class="container px-5 2xl:px-0 mx-auto max-w-7xl h-20 lg:h-28 flex justify-between items-center relative"
    >
      <!-- Logo -->
      <NuxtLink to="/" aria-label="Go to homepage">
        <img
          src="assets/img/sarva-ubud-logo.png"
          width="76"
          height="56"
          class="h-14 w-auto"
          alt="rnc"
        />
      </NuxtLink>

      <!-- Desktop menu -->
      <ul class="hidden lg:flex gap-14 items-center">
        <li
          v-for="item in menus"
          :key="item.text"
          class="uppercase text-nowrap"
        >
          <NuxtLink :to="item.url">{{ item.text }}</NuxtLink>
        </li>
      </ul>
      <ul class="hidden lg:flex items-center gap-10 text-sm">
        <li>
          <NuxtLink
            to="/login"
            class="uppercase py-3 px-8 border text-white border-primary bg-primary hover:bg-primary-darker transition-colors ease-in duration-150"
          >
            Check Availabillity
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        @click="showNav"
        class="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
      >
        <span class="w-6 h-0.5 bg-white"></span>
        <span class="w-6 h-0.5 bg-white"></span>
        <span class="w-6 h-0.5 bg-white"></span>
      </button>
    </div>

    <!-- Mobile nav -->
    <nav
      id="nav"
      class="hidden flex-col fixed z-50 w-full left-0 top-0 h-screen bg-black"
    >
      <div
        id="bgNav"
        class="absolute inset-0 bg-cover bg-center opacity-0"
        style="background-image: url('img/bg-nav.webp')"
      ></div>

      <!-- Top bar -->
      <div
        class="opacity-0 nav-item relative flex justify-between items-center px-5 py-6"
      >
        <NuxtLink to="/" @click="closeNav">
          <img
            src="assets/img/sarva-ubud-logo.png"
            width="76"
            height="40"
            class="h-10 w-auto"
            alt="rnc"
          />
        </NuxtLink>
        <button @click="closeNav" aria-label="Close menu">
          <div class="text-3xl font-bold">&times;</div>
        </button>
      </div>

      <!-- Menu list -->
      <ul class="relative flex flex-col items-start px-5 pt-6">
        <li
          v-for="item in menus"
          :key="item.text"
          class="nav-item opacity-0 text-2xl uppercase w-full text-center border-b border-white/10 py-4"
        >
          <NuxtLink :to="item.url" @click="closeNav">{{ item.text }}</NuxtLink>
        </li>
        <li class="nav-item opacity-0 my-4 w-full text-center flex">
          <NuxtLink
            to="/login"
            class="uppercase py-3 w-full rounded-full border text-black bg-primary hover:text-black transition-colors ease-in duration-150"
            @click="closeNav"
          >
            Check Availabillity
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
