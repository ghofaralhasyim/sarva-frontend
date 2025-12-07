<script setup lang="ts"></script>

<template>
  <section id="home" class="relative h-lvh max-h-[980px]">
    <div
      class="absolute top-0 inset-x-0 h-[200px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.5)_30%,transparent_100%)] z-1"
    ></div>
    <div class="absolute inset-0">
      <picture>
        <source srcset="@/assets/img/bg-hero.jpg" media="(min-width:1080px)" />
        <img
          src="@/assets/img/bg-hero.jpg"
          class="w-full h-full object-cover"
          alt=""
        />
      </picture>
    </div>
    <div
      class="container mx-auto px-5 xl:px-0 flex flex-col items-center justify-center text-center relative text-white h-full z-10"
    >
      <div
        data-aos="fade"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        <p class="font-serif text-2xl italic mb-8">Welcome to</p>
        <img
          src="@/assets/img/sarva-ubud-text.png"
          class="h-[55px] object-contain"
          alt="sarva ubud"
        />
        <p
          class="mt-5 lg:mt-10 leading-7 lg:text-xl text-center max-w-[420px] lg:max-w-[620px]"
        >
          Nestled in Bali’s lush highlands, Sarva Villa offers an elegant escape
          where luxury meets nature’s serene embrace.
        </p>
      </div>
      <NuxtLink
        data-aos="fade"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-once="true"
        to="/#activities"
        class="bg-primary px-14 lg:px-10 text-white mt-[100px] lg:mt-32 py-3 lg:text-lg cursor-pointer hover:bg-primary-darker hover:transition-color duration-300"
      >
        Booking Now
      </NuxtLink>
    </div>
  </section>
</template>
