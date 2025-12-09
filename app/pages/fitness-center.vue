<script lang="ts" setup></script>

<template>
  <section class="relative pt-24 pb-16 min-h-[520px]">
    <img
      src="@/assets/img/fitness-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[64px]">Fitness Center</h2>
      <p class="text-xl mt-4">
        Find your power at our state-of-the-art fitness center, conveniently
        located just behind the lobby. Get a refreshing workout before your day
        begins or after a long flight. Fully equipped with modern machines to
        help you stay on track. Your daily boost awaits!
      </p>
    </div>
  </section>
  <section
    class="pt-32 pb-20 text-black container px-5 xl:px-0 mx-auto max-w-324 flex gap-16 items-center relative"
  >
    <div class="w-full">
      <h3 class="italic font-serif font-medium text-[32px]">
        Your Ubud Wellness Escape Starts Here
      </h3>
      <div class="mt-3">
        <p class="">
          Don’t let your holiday interrupt your healthy rhythm! Discreetly
          located right behind the joglo tropical house style lobby, our
          Exclusive Fitness Center is your perfect wellness oasis in Ubud.
        </p>
        <p class="mt-6">
          No need to search for an outside gym. Start your day with an
          energizing session on our premium equipment, or wind down from your
          adventures with restorative strength training. We are here to support
          your commitment to true holistic wellness.
        </p>
        <p class="mt-6">
          It’s your time to relax, explore, and stay fit. Take advantage of the
          ultimate convenience—just one easy step from your room—and enjoy your
          Ubud getaway with a refreshed body and a clear mind!
        </p>
      </div>
    </div>
    <div class="max-w-[580px] h-[650px] w-full">
      <img
        src="@/assets/img/fitness.jpg"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
  </section>
  <OtherFacilities />
  <CTASection />
</template>
