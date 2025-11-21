<script lang="ts" setup></script>

<template>
  <footer class="bg-sarva-green text-white">
    <div
      class="container py-16 px-5 2xl:px-0 mx-auto max-w-7xl flex justify-between gap-12"
    >
      <div
        class="w-fit flex flex-col text-white gap-6 lg:gap-4 mt-2 lg:max-w-[45%] 2xl:max-w-[40%] text-sm lg:text-base"
      >
        <div class="h-24 w-full">
          <img
            src="@/assets/img/sarva-ubud-logo-white.png"
            alt="sarva ubund"
            class="w-full h-24 object-contain"
          />
        </div>
      </div>

      <div class="flex gap-24 w-fit">
        <div class="">
          <p class="text-xl mb-6 font-bold">Menu</p>
          <ul class="grid grid-cols-2 gap-x-24 gap-y-4">
            <li class="text-nowrap"><NuxtLink>Villas</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>Gallery</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>Special Offers</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>About Us</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>Facilities</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>Contact Us</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>Dining</NuxtLink></li>
            <li class="text-nowrap"><NuxtLink>FAQ</NuxtLink></li>
          </ul>
        </div>

        <div class="">
          <p class="text-xl mb-6 font-bold">Menu</p>
          <ul class="flex flex-col gap-4 max-w-60">
            <li class="">
              Address Here Lorem ipsum dolor sit amet consectetur.
            </li>
            <li class="">+62-8123-4567-8901</li>
            <li class="">contact@sarvaubudbali.com</li>
          </ul>
        </div>

        <div class="h-[200px] w-full max-w-[350px] rounded-md overflow-hidden">
          <img
            src="@/assets/img/maps.jpg"
            class="w-full h-full object-cover"
            alt="sarva ubud maps"
          />
        </div>
      </div>
    </div>
  </footer>
</template>
