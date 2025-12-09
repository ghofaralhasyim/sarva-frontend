<script lang="ts" setup></script>

<template>
  <footer class="bg-sarva-green text-white">
    <div
      class="container py-16 px-5 xl:px-0 mx-auto max-w-324 flex flex-col justify-center lg:flex-row lg:justify-between gap-16 lg:gap-16"
    >
      <div
        class="w-full lg:w-fit flex flex-col item-center text-white gap-10 mt-2 lg:max-w-[45%] 2xl:max-w-[40%] text-sm lg:text-base"
      >
        <div class="h-20 w-full">
          <img
            src="@/assets/img/sarva-ubud-logo-white.png"
            alt="sarva ubund"
            class="w-full h-20 object-contain"
          />
        </div>
        <ul class="flex gap-8 justify-center items-center">
          <li class="">
            <NuxtLink to="#">
              <img
                src="@/assets/img/icon/ig-white.png"
                alt="instagram"
                class="h-[30px] w-[30px] aspect-square"
              />
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink to="#">
              <img
                src="@/assets/img/icon/fb-white.png"
                alt="instagram"
                class="h-[30px] w-[30px] aspect-square"
              />
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink to="#">
              <img
                src="@/assets/img/icon/yt-white.png"
                alt="instagram"
                class="h-9 w-9 aspect-square"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full lg:w-fit">
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
          <p class="text-xl mb-6 font-bold">Contact</p>
          <ul class="flex flex-col gap-4 lg:max-w-60">
            <li class="">
              Address Here Lorem ipsum dolor sit amet consectetur.
            </li>
            <li class="">+62-8123-4567-8901</li>
            <li class="">contact@sarvaubudbali.com</li>
          </ul>
        </div>

        <div
          class="h-[200px] w-full lg:max-w-[350px] rounded-md overflow-hidden"
        >
          <img
            src="@/assets/img/maps.jpg"
            class="w-full h-full object-cover"
            alt="sarva ubud maps"
          />
        </div>
      </div>
    </div>
    <p class="mx-auto text-center pt-6 pb-10 font-medium font-sans">
      © Copyright 2025 Sarva Ubud Villa. All rights reserved.
    </p>
  </footer>
</template>
