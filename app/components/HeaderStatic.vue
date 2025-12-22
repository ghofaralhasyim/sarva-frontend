<script lang="ts" setup>
const { $gsap } = useNuxtApp();

const menus = [
  { text: "Homepage", url: "/" },
  { text: "Villas", url: "/villas" },
  { text: "Facilities", url: "/services-and-facilities" },
  { text: "Wellness", url: "/spa-and-wellness" },
  { text: "Dining", url: "/restaurant" },
  { text: "Events", url: "/events" },
  { text: "Gallery", url: "/gallery" },
  { text: "Special Offers", url: "/special-offers" },
  { text: "Contact Us", url: "/contact-us" },
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

const route = useRoute();

function isActive(url: string) {
  return route.path === url || route.path.startsWith(url + "/");
}
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-9999 transition-all duration-300 flex items-center bg-sarva-green text-white shadow-md h-20 lg:h-24"
  >
    <div
      class="container px-5 xl:px-0 mx-auto max-w-324 flex justify-between items-center relative"
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
        <template v-for="item in menus" :key="item.text">
          <li
            v-if="item.url !== '/contact-us' && item.url !== '/'"
            class="text-nowrap"
          >
            <NuxtLink
              :to="item.url"
              :class="{ 'text-primary': isActive(item.url) }"
              >{{ item.text }}</NuxtLink
            >
          </li>
        </template>
      </ul>
      <ul class="hidden lg:flex items-center gap-10 text-sm">
        <li>
          <NuxtLink
            to="#"
            class="py-3 px-8 border text-white border-primary bg-primary hover:bg-primary-darker transition-colors ease-in duration-150"
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
      class="hidden flex-col fixed z-50 w-full left-0 top-0 h-screen bg-sarva-green"
    >
      <div
        id="bgNav"
        class="absolute inset-0 bg-cover bg-center opacity-0"
        style="background-image: url('img/bg-nav.webp')"
      ></div>

      <!-- Top bar -->
      <div class="opacity-0 nav-item relative flex justify-between px-5 py-6">
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
      <div
        class="relative flex flex-col items-start justify-between px-5 pt-6 h-full"
      >
        <ul class="flex flex-col items-start justify-between h-full">
          <li
            v-for="item in menus"
            :key="item.text"
            class="nav-item opacity-0 text-2xl w-full"
          >
            <NuxtLink :to="item.url" @click="closeNav">{{
              item.text
            }}</NuxtLink>
          </li>
        </ul>
        <div class="nav-item opacity-0 my-4 flex text-center w-full pt-6">
          <NuxtLink
            to="#"
            class="py-3 w-full text-white bg-primary transition-colors ease-in duration-150"
            @click="closeNav"
          >
            Check Availabillity
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>
