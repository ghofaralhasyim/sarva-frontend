<script lang="ts" setup>
definePageMeta({
  layout: "layout2",
});

import { ref, computed } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import type { ApiRoom } from "~/types/types";

type DateRange = [Date, Date] | [];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dateRange = ref<DateRange>([today, tomorrow]);
const adults = ref<number>(2);
const children = ref<number>(0);

const nights = computed<number>(() => {
  if (dateRange.value.length !== 2) return 0;
  const [start, end] = dateRange.value;
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

const dateLabel = computed<string>(() => {
  if (dateRange.value.length !== 2) return "Select dates";
  return `${formatDate(dateRange.value[0], "ddMMyyyy")} – ${formatDate(
    dateRange.value[1],
    "ddMMyyyy"
  )}`;
});

interface Villa {
  id: number;
  title: string;
  subTitle: string;
  space: number;
  capacity: number;
  bedType: string;
  pool: string;
  description: string;
  features: string[];
  url: string;
  image: string;
  slug: string;
  amenities: string[];
  images: string[];
  price: number;
  priceWithBreakfast: number;
  availableRooms: number;
}

const villas = ref<Villa[]>([
  {
    id: 1,
    title: "One-Bedroom Private Pool Villa",
    subTitle:
      " Perfect for families or friends, these spacious villas offer comfort and connection.",
    space: 224,
    capacity: 2,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description: `<p class="leading-[25px]">Escape to your intimate Ubud sanctuary! Our One-Bedroom Villa features a plush double bed and a sparkling private pool just steps from your door. Enjoy cozy meals in the dining area with kitchenette. The luxurious bathroom is a retreat with an air-conditioned bathtub for the ultimate soak.</p>`,
    features: [
      "Private swimming pool with tropical surroundings",
      "Elegant single bedroom with premium bedding",
      "Open-plan living area with natural lighting",
      "Outdoor dining space and fully-equipped kitchenette",
      "Spacious wooden deck with sun-loungers",
      "Floor-to-ceiling windows with garden views",
      "En-suite bathroom with modern fixtures",
      "Soothing interior design inspired by Balinese elements",
      "Full air-conditioning for indoor comfort",
    ],
    url: "#",
    image: "/img/villas/1.jpg",
    slug: "one-bedroom-private-pool-villa",
    amenities: [
      "A Spacious bed, sleep for 2 persons",
      "Hair dryer",
      "Aromatic room refreshment",
      "Refrigerator with Minibar items",
      "Individual Controlled Air conditioning",
      "Safety box",
      "Bathroom with shower & separate bathtub",
      "Sofa",
      "50-inch smart LED TV",
      "Laundry bag",
      "Private pool",
      "Room Signages",
      "Wi-Fi",
      "Mosquito repellent",
      "Sun deck with pool’s chair and umbrella",
      "Room service",
      "Wardrobe",
      "Umbrella",
      "Kitchenette with pantry",
      "In-room phone",
      "Slippers",
      "Writing desk with chair",
      "Dining table",
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    price: 2100000,
    priceWithBreakfast: 2250000,
    availableRooms: 3,
  },
  {
    id: 2,
    title: "Two-Bedroom Private Pool Villa",
    subTitle:
      "Perfect for couples or solo travelers, these 15 exclusive units offer privacy and serenity. Indulge in pure Balinese bliss.",
    space: 224,
    capacity: 4,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description: `
        <p class="leading-[25px]">Unwind with family or friends in our spacious Two-Bedroom Villa. With only 3 units available, secure your perfect group getaway. Each villa boasts a large private pool and a shared dining area with kitchenette for easy entertaining. Both bedrooms feature a comfortable double bed. </p>
        <p class="mt-4 leading-[25px]">After a day exploring, relax in the elegant bathroom, complete with an air-conditioned bathtub. Experience luxury and togetherness in your private Ubud residence.</p>
    `,
    features: [
      "Private swimming pool with tropical surroundings",
      "Elegant single bedroom with premium bedding",
      "Open-plan living area with natural lighting",
      "Outdoor dining space and fully-equipped kitchenette",
      "Spacious wooden deck with sun-loungers",
      "Floor-to-ceiling windows with garden views",
      "En-suite bathroom with modern fixtures",
      "Soothing interior design inspired by Balinese elements",
      "Full air-conditioning for indoor comfort",
    ],
    url: "#",
    image: "/img/villas/2.jpg",
    slug: "two-bedroom-private-pool-villa",
    amenities: [
      "A Spacious bed, sleep for 2 persons",
      "Hair dryer",
      "Aromatic room refreshment",
      "Refrigerator with Minibar items",
      "Individual Controlled Air conditioning",
      "Safety box",
      "Bathroom with shower & separate bathtub",
      "Sofa",
      "50-inch smart LED TV",
      "Laundry bag",
      "Private pool",
      "Room Signages",
      "Wi-Fi",
      "Mosquito repellent",
      "Sun deck with pool’s chair and umbrella",
      "Room service",
      "Wardrobe",
      "Umbrella",
      "Kitchenette with pantry",
      "In-room phone",
      "Slippers",
      "Writing desk with chair",
      "Dining table",
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    price: 2100000,
    priceWithBreakfast: 2250000,
    availableRooms: 3,
  },
  {
    id: 3,
    title: "Three Bedroom Private Pool Villa",
    subTitle:
      "Perfect for large families or groups seeking unparalleled space and exclusivity.",
    space: 224,
    capacity: 6,
    bedType: "1 Queen-size Bed",
    pool: "Private Garden & Pool",
    description: `
        <p class="leading-[25px]">Experience the pinnacle of luxury in our singular Three-Bedroom Villa. This one-of-a-kind residence is your grand home away from home. Gather around the expansive private pool or share meals in the large dining area with kitchenette. Each of the three bedrooms has a double bed for ultimate comfort.</p>
        <p class="mt-4 leading-[25px]">The master bathroom features a lavish air-conditioned bathtub. Perfect for large families or groups seeking unparalleled space and exclusivity.</p>
    `,
    features: [
      "Private swimming pool with tropical surroundings",
      "Elegant single bedroom with premium bedding",
      "Open-plan living area with natural lighting",
      "Outdoor dining space and fully-equipped kitchenette",
      "Spacious wooden deck with sun-loungers",
      "Floor-to-ceiling windows with garden views",
      "En-suite bathroom with modern fixtures",
      "Soothing interior design inspired by Balinese elements",
      "Full air-conditioning for indoor comfort",
    ],
    url: "#",
    image: "/img/villas/3.jpg",
    slug: "three-bedroom-private-pool-villa",
    amenities: [
      "A Spacious bed, sleep for 2 persons",
      "Hair dryer",
      "Aromatic room refreshment",
      "Refrigerator with Minibar items",
      "Individual Controlled Air conditioning",
      "Safety box",
      "Bathroom with shower & separate bathtub",
      "Sofa",
      "50-inch smart LED TV",
      "Laundry bag",
      "Private pool",
      "Room Signages",
      "Wi-Fi",
      "Mosquito repellent",
      "Sun deck with pool’s chair and umbrella",
      "Room service",
      "Wardrobe",
      "Umbrella",
      "Kitchenette with pantry",
      "In-room phone",
      "Slippers",
      "Writing desk with chair",
      "Dining table",
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    price: 2100000,
    priceWithBreakfast: 2250000,
    availableRooms: 3,
  },
]);

onMounted(() => {
  checkAvailability();
});

const selectedRoomId = ref<number>();
const isWithBreakfast = ref<boolean>(false);

const qtyByRoom = ref<Record<number, number>>({});

watch(dateRange, (newVal) => {
  checkAvailability();
});

watch(adults, (newVal) => {
  checkAvailability();
});

watch(children, (newVal) => {
  checkAvailability();
});

const isLoading = ref<boolean>(false);
const checkAvailability = async () => {
  if (dateRange.value.length !== 2) return;

  isLoading.value = true;
  try {
    await useCsFetch(
      `/rooms?check_in_date=${formatDate(
        dateRange.value[0],
        "queryApi"
      )}&check_out_date=${formatDate(dateRange.value[1], "queryApi")}`,
      {
        method: "GET",
        onResponse({ response }) {
          if (response.status != 200) return;

          const temp: Villa[] = [];
          for (const villa of villas.value) {
            const data = response._data.data.find(
              (val: ApiRoom) => val.id === villa.id
            );

            if (!data) continue;

            villa.price = data.price_per_night;
            villa.priceWithBreakfast = data.price_with_breakfast;
            villa.availableRooms = data.available_rooms;
            villa.capacity = data.capacity;
            temp.push(villa);
          }
          villas.value = temp;
        },
      }
    );
  } catch (error: any) {
    let msg = getErrorFetchMessage(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="bg-[#f1f1f1] md:pt-38">
    <section
      class="container px-5 xl:px-0 mx-auto max-w-[1256px] relative min-h-[300px]"
    >
      <img
        src="@/assets/img/booking-header.jpg"
        class="w-full h-full absolute inset-0 object-cover"
        alt=""
      />
    </section>

    <section
      class="container mx-auto px-5 xl:px-0 mt-5 max-w-[1256px] relative md:mt-12"
    >
      <div
        class="bg-white shadow-md border border-primary w-full min-h-20 flex items-center px-3 md:px-4 rounded md:rounded-none text-sm pb-4 md:pb-0"
      >
        <div class="flex flex-col md:flex-row w-full">
          <!-- Date Range Picker -->
          <div class="md:border-r-2 border-gray-200 w-full flex items-center">
            <VueDatePicker
              v-model="dateRange"
              range
              :min-date="new Date()"
              :time-config="{ enableTimePicker: false }"
              format="dd MMM yyyy"
            >
              <template #trigger>
                <div
                  class="flex flex-col md:flex-row md:items-center py-3 cursor-pointer gap-2"
                >
                  <div class="font-semibold flex items-center">
                    <Icon name="mynaui:calendar" size="1.25rem" class="mr-3" />
                    {{ dateLabel }}
                  </div>
                  <div
                    class="text-xs py-1 text-white bg-sarva-green px-2 mx-4 w-fit rounded ml-8"
                  >
                    {{ nights }} Night<span v-if="nights !== 1">s</span>
                  </div>
                  <div class="hidden md:block">
                    <Icon name="mynaui:chevron-down" size="1.25rem" />
                  </div>
                </div>
              </template>
            </VueDatePicker>
          </div>

          <!-- Guests -->
          <Popover
            class="w-full flex flex-col md:flex-row md:items-center relative border-gray-200 md:pl-12 md:pr-8"
          >
            <PopoverButton
              class="w-full flex items-center md:gap-3 md:py-3 text-left cursor-pointer outline-none"
            >
              <div class="flex items-center gap-2 font-semibold">
                <div class="flex items-center">
                  <Icon name="mynaui:user" size="1.25rem" class="mr-3" />
                  {{ adults }} Adult<span v-if="adults !== 1">s</span>,
                </div>
                <div class="">
                  {{ children }} Child<span v-if="children !== 1">ren</span>
                </div>
              </div>
            </PopoverButton>

            <PopoverPanel
              class="absolute z-20 mt-2 w-full bg-white shadow-lg p-4 space-y-4 top-7 border border-primary rounded md:rounded-none md:top-16 left-0"
            >
              <GuestRow label="Adults" v-model="adults" :min="1" />
              <GuestRow label="Children" v-model="children" />
            </PopoverPanel>
            <div class="hidden md:block">
              <Icon name="mynaui:chevron-down" size="1.25rem" />
            </div>
          </Popover>

          <!-- Button -->
          <div class="mt-5 md:mt-0 md:min-w-[220px]">
            <button
              class="bg-primary hover:bg-primary-darker text-white px-6 py-3 cursor-pointer transition-all w-full rounded md:rounded-none"
              @click="checkAvailability"
            >
              {{ isLoading ? "Loading..." : "Check Availability" }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section
      class="container mx-auto px-5 xl:px-0 mt-5 max-w-[1256px] relative md:mt-12 pb-12"
    >
      <ul class="flex flex-col relative">
        <ClientOnly>
          <template v-for="item in villas" :key="item.id">
            <BookingRoom
              v-model:qty="qtyByRoom[item.id]"
              v-model:room-id="selectedRoomId"
              v-model:with-breakfast="isWithBreakfast"
              :room="item"
              :adults="adults"
              :children="children"
              :nights="nights"
              :check-in="dateRange[0] || today"
              :check-out="dateRange[1] || tomorrow"
            />
          </template>
        </ClientOnly>
        <div v-if="isLoading" class="inset-0 bg-black/20 absolute z-10"></div>
      </ul>
    </section>
  </div>
</template>
