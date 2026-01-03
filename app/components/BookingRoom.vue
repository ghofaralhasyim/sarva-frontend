<script lang="ts" setup>
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

interface Props {
  room: Villa;
  adults: number;
  children: number;
  nights: number;
  checkIn: Date;
  checkOut: Date;
}

const props = withDefaults(defineProps<Props>(), {});

const qty = ref<number>(1);

const minQty = computed<number>(() => {
  if (!props.room?.capacity || props.adults <= 0) return 1;
  return Math.ceil(props.adults / props.room.capacity);
});

const maxQty = computed<number>(() => {
  // ensure max is never below min
  const available = props.room.availableRooms ?? 0;
  return Math.max(available, minQty.value);
});

const emit = defineEmits<{
  (e: "update:qty", value: number): void;
  (e: "update:roomId", value: number): void;
  (e: "update:withBreakfast", value: boolean): void;
}>();

watch(
  [minQty, maxQty],
  () => {
    const min = minQty.value;
    const max = maxQty.value;

    // clamp: min <= qty <= max
    if (qty.value < min) qty.value = min;
    if (qty.value > max) qty.value = max;
  },
  { immediate: true }
);

watch(qty, (newQty) => {
  emit("update:qty", newQty);
});

const router = useRouter();
const selectRoom = (withBreakfast: boolean) => {
  emit("update:roomId", props.room.id);
  emit("update:withBreakfast", withBreakfast);
  router.push(
    `/booking/confirmation?id=${props.room.id}&childer=${
      props.children
    }&adults=${props.adults}&checkIn=${formatDate(
      props.checkIn,
      "queryDate"
    )}&checkOut=${formatDate(props.checkOut, "queryDate")}&qty=${qty.value}`
  );
};
</script>

<template>
  <li v-if="room.availableRooms >= qty" class="bg-white p-5 not-first:mt-12">
    <div
      class="flex flex-col md:flex-row gap-2 md:gap-8 pb-6 border-b border-black/20"
    >
      <div class="w-full h-[180px] md:h-[233px] md:w-[350px]">
        <img
          :src="room.image"
          class="w-full h-full object-cover"
          alt="image room"
        />
      </div>
      <div class="flex flex-col gap-4 md:gap-6">
        <p class="font-medium text-lg md:text-xl mt-2">
          {{ room.title }}
        </p>
        <ul class="flex flex-col text-xs gap-4">
          <li class="flex items-center gap-4">
            <div class="w-5 h-5 aspect-square">
              <img
                src="@/assets/img/icon/square.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
            <span>{{ room.space }} sqm</span>
          </li>
          <li class="flex items-center gap-4">
            <div class="w-5 h-5 aspect-square">
              <img
                src="@/assets/img/icon/users.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
            <span>{{ room.capacity }} Adults</span>
          </li>
          <li class="flex items-center gap-4">
            <div class="w-5 h-5 aspect-square">
              <img
                src="@/assets/img/icon/bed.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
            <span>{{ room.bedType }}</span>
          </li>
          <li class="flex items-center gap-4">
            <div class="w-5 h-5 aspect-square">
              <img
                src="@/assets/img/icon/pool.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
            <span>{{ room.pool }}</span>
          </li>
          <li>
            <NuxtLink class="underline text-primary cursor-pointer"
              >More Info</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="pt-6 flex gap-4 items-center">
      <p class="font-medium md:text-lg">Room Only</p>
      <NuxtLink
        class="text-xs md:text-sm text-sarva-green flex items-center gap-2"
        >View Details <Icon name="mynaui:arrow-up-right"
      /></NuxtLink>
    </div>
    <div
      class="mt-4 md:mt-8 grid grid-cols-2 gap-4 md:flex justify-between items-center text-sm border-b border-black/20 pb-6"
    >
      <div class="flex items-center gap-2 font-semibold">
        <div class="flex gap-4 items-center">
          <div class="w-5 h-5 aspect-square">
            <img
              src="@/assets/img/icon/users.png"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div>{{ adults }} Adult<span v-if="adults !== 1">s</span></div>
        </div>
        <div v-if="children != 0" class="">
          , {{ children }} Child<span v-if="children !== 1">ren</span>
        </div>
      </div>
      <BookingQty :min="minQty" :max="maxQty" v-model="qty" />
      <div class="flex flex-col">
        <p class="text-lg md:text-xl font-medium">
          IDR {{ formatCurrency(room.price * qty * nights) }}
        </p>
        <p class="text-xs md:text-sm font-semibold">
          Rate for {{ nights }} night<span v-if="nights !== 1">s</span>
          <span
            >, {{ children + adults }} guest<span v-if="children + adults !== 1"
              >s</span
            ></span
          >
        </p>
      </div>
      <div class="flex md:w-[150px]">
        <button
          class="bg-primary text-center hover:bg-primary-darker text-white px-6 py-3 cursor-pointer transition-all w-full"
          @click="selectRoom(false)"
        >
          Book Now
        </button>
      </div>
    </div>
    <div class="pt-6 flex gap-4 items-center">
      <p class="font-medium md:text-lg">Breakfast Package</p>
      <NuxtLink
        class="text-xs md:text-sm text-sarva-green flex items-center gap-2"
        >View Details <Icon name="mynaui:arrow-up-right"
      /></NuxtLink>
    </div>
    <div
      class="mt-4 md:mt-8 grid grid-cols-2 gap-4 md:flex justify-between items-center text-sm border-black/20 pb-6"
    >
      <div class="flex items-center gap-2 font-semibold">
        <div class="flex gap-4 items-center">
          <div class="w-5 h-5 aspect-square">
            <img
              src="@/assets/img/icon/users.png"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div>{{ adults }} Adult<span v-if="adults !== 1">s</span></div>
        </div>
        <div v-if="children != 0" class="">
          , {{ children }} Child<span v-if="children !== 1">ren</span>
        </div>
      </div>
      <BookingQty :min="minQty" :max="maxQty" v-model="qty" />
      <div class="flex flex-col">
        <p class="text-lg md:text-xl font-medium">
          IDR {{ formatCurrency(room.priceWithBreakfast * qty * nights) }}
        </p>
        <p class="text-xs md:text-sm font-semibold">
          Rate for {{ nights }} night<span v-if="nights !== 1">s</span>
          <span
            >, {{ children + adults }} guest<span v-if="children + adults !== 1"
              >s</span
            ></span
          >
        </p>
      </div>
      <div class="flex md:w-[150px]">
        <button
          class="bg-primary text-center hover:bg-primary-darker text-white px-6 py-3 cursor-pointer transition-all w-full"
          @click="selectRoom(true)"
        >
          Book Now
        </button>
      </div>
    </div>
  </li>
</template>
