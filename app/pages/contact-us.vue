<script lang="ts" setup></script>

<template>
  <section class="relative py-20 min-h-[520px]">
    <img
      src="@/assets/img/contact-header.jpg"
      class="w-full h-full absolute inset-0 object-cover"
      alt=""
    />
    <div
      class="container min-h-[520px] px-5 2xl:px-0 mx-auto max-w-[700px] text-center relative text-white flex flex-col justify-center items-center"
    >
      <h2 class="font-serif text-[64px]">Contact Us</h2>
      <p class="text-xl mt-4">
        Stay in touch with latest promotion and stories from our Sarva Ubud
        Villa for your next Memorable Holiday in Ubud.
      </p>
    </div>
  </section>
  <section
    class="py-36 text-black container px-5 2xl:px-0 mx-auto max-w-7xl grid grid-cols-2"
  >
    <div class="">
      <p class="font-serif text-[42px] mt-4 leading-[42px]">Sarva Ubud Bali</p>
      <h2 class="font-serif text-[32px] leading-8 italic mt-12">
        Contact Information
      </h2>
      <p class="text-black/50 mt-6">Address</p>
      <p class="text-xl mt-1">
        Jalan Tirta Tawar No. XX Banjar Kutuh Kaja, Ubud, Gianyar, Bali,
        Indonesia
      </p>
      <p class="text-black/50 mt-8">Phone</p>
      <p class="text-xl mt-1">+62-8123-4567-8901</p>
      <p class="text-black/50 mt-8">Whatsapp</p>
      <p class="text-xl mt-1">+62-8123-4567-8901</p>
      <p class="text-black/50 mt-8">Email</p>
      <p class="text-xl mt-1">contact@sarvaubudbali.com</p>
      <h2 class="font-serif text-[32px] leading-8 italic mt-12">Follow Us</h2>
      <ul class="mt-8 flex gap-8">
        <li class="">
          <NuxtLink to="#">
            <img
              src="@/assets/img/icon/ig.png"
              alt="instagram"
              class="h-[30px] w-[30px] aspect-square"
            />
          </NuxtLink>
        </li>
        <li class="">
          <NuxtLink to="#">
            <img
              src="@/assets/img/icon/fb.png"
              alt="instagram"
              class="h-[30px] w-[30px] aspect-square"
            />
          </NuxtLink>
        </li>
        <li class="">
          <NuxtLink to="#">
            <img
              src="@/assets/img/icon/yt.png"
              alt="instagram"
              class="h-9 w-9 aspect-square"
            />
          </NuxtLink>
        </li>
        <li class="">
          <NuxtLink to="#">
            <img
              src="@/assets/img/icon/wa.png"
              alt="instagram"
              class="h-[30px] w-[30px] aspect-square"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="bg-sarva-green p-10 text-white">
      <h2 class="font-serif text-[42px] mt-4 leading-[42px]">Contact Form</h2>
      <div class="mt-8">
        <label for="name" class="text-white/50">Your name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="py-2.5 px-4 w-full bg-white/50 focus:outline-none mt-2"
        />
      </div>
      <div class="mt-4">
        <label for="email" class="text-white/50">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          class="py-2.5 px-4 w-full bg-white/50 focus:outline-none mt-2"
        />
      </div>
      <div class="mt-4">
        <label for="message" class="text-white/50">Message</label>
        <textarea
          rows="6"
          name="message"
          id="message"
          class="py-2.5 px-4 w-full bg-white/50 focus:outline-none mt-2"
        ></textarea>
      </div>
      <div class="flex w-full mt-8">
        <NuxtLink
          to="#"
          class="bg-primary text-center py-4 w-full cursor-pointer hover:bg-primary-darker transition-colors ease-in duration-150"
          >Submit</NuxtLink
        >
      </div>
    </div>
  </section>
  <CTASection />
</template>
