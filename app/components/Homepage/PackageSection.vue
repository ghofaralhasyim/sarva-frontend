<script lang="ts" setup></script>

<template>
  <section class="bg-white">
    <div class="pt-32 pb-46 container px-5 2xl:px-0 mx-auto max-w-7xl">
      <h2 class="font-serif text-[40px]">Your Private Sanctuary in Ubud</h2>
      <p class="max-w-[680px] text-xl mt-6">
        After a day of discovery, retreat to your Ubud private pool villa to
        relax and recharge. Sarva Ubud Villa offers the ideal location for an
        unforgettable Ubud experience.
      </p>
      <ul class="grid grid-cols-3 gap-5 mt-10">
        <li
          class="min-h-[520px] relative p-8 flex flex-col justify-end text-white"
        >
          <div class="min-h-[520px] absolute inset-0">
            <img
              src="@/assets/img/package-1.jpg"
              alt=""
              class="object-cover w-full h-full min-h-[520px]"
            />
          </div>
          <div class="relative flex flex-col">
            <h3 class="font-semibold text-2xl">Early Bird Offer</h3>
            <p class="mt-2">
              Book 30 days in advance and enjoy 10% off your stay
            </p>
            <NuxtLink to="#" class="bg-primary text-center py-2 mt-7"
              >View Details</NuxtLink
            >
          </div>
        </li>
        <li
          class="min-h-[520px] relative p-8 flex flex-col justify-end text-white"
        >
          <div class="min-h-[520px] absolute inset-0">
            <img
              src="@/assets/img/package-2.jpg"
              alt=""
              class="object-cover w-full h-full min-h-[520px]"
            />
          </div>
          <div class="relative flex flex-col">
            <h3 class="font-semibold text-2xl">Honeymoon Package</h3>
            <p class="mt-2">
              A romantic escape with floral touches, in-villa breakfast, and a
              private dinner.
            </p>
            <NuxtLink to="#" class="bg-primary text-center py-2 mt-7"
              >View Details</NuxtLink
            >
          </div>
        </li>
        <li
          class="min-h-[520px] relative p-8 flex flex-col justify-end text-white"
        >
          <div class="min-h-[520px] absolute inset-0">
            <img
              src="@/assets/img/package-3.jpg"
              alt=""
              class="object-cover w-full h-full min-h-[520px]"
            />
          </div>
          <div class="relative flex flex-col">
            <h3 class="font-semibold text-2xl">Last-Minute Deal</h3>
            <p class="mt-2">
              Last-minute escape? Enjoy special rates for bookings within 7
              days.
            </p>
            <NuxtLink to="#" class="bg-primary text-center py-2 mt-7"
              >View Details</NuxtLink
            >
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
