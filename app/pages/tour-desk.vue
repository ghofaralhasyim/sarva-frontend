<script lang="ts" setup></script>

<template>
  <section class="relative pt-24 pb-16 min-h-[520px]">
    <img
      src="@/assets/img/tour-desk-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 2xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-latin text-[64px]">Tour Desk</h2>
      <p class="text-xl mt-4">
        From thrilling adventures to cultural journeys, we’ll plan every detail
        so you can simply enjoy the experience.
      </p>
    </div>
  </section>
  <section
    class="pt-32 pb-20 text-black container px-5 2xl:px-0 mx-auto max-w-[1256px] flex gap-16 items-center relative"
  >
    <div class="w-full">
      <h3 class="italic font-latin font-medium text-[32px]">
        Unlock Your Ubud Adventure Here!
      </h3>
      <div class="mt-3">
        <p class="">
          READY to dive deeper into the magic of Bali? Skip the guesswork and
          visit our dedicated Tour Desk. We’re your one-stop spot for
          unforgettable Ubud experiences! We feature the best local adventures:
        </p>
        <ul class="pl-4 list-disc">
          <li class="">
            Heart-Pounding Rafting on the Ayung River or Cycling Tour around
            Ubud to Kintamani
          </li>
          <li>
            Tickets to enchanting Balinese Art Performances in Ubud and nearby.
          </li>
          <li>
            Custom Daily Tours to temples, rice fields, swing and hidden
            waterfalls (for other attractions, see Lovely Destinations page)
          </li>
          <li>Ubud Shopping and Art Tour</li>
        </ul>
        <p class="mt-6">
          Let us handle the details—transportation, tickets, and local
          insights—so you can focus on making memories. Your next Bali story
          starts at the Tour Desk. Stop by today!
        </p>
      </div>
    </div>
    <div class="max-w-[580px] h-[650px] w-full">
      <img
        src="@/assets/img/tour-desk.jpg"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
  </section>
  <OtherFacilities />
  <CTASection />
</template>
