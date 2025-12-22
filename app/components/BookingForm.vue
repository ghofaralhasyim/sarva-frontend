<script lang="ts" setup>
import type { Villa } from "~/types/types";
interface Props {
  adults: number;
  children: number;
  room: Villa | undefined;
  nights: number;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  isWithBreakfast: boolean;
  qty: number;
}

const props = withDefaults(defineProps<Props>(), {});

const bedType = ["1 Queen-size Bed", "1 King Size"];

const subTotal = computed<number>(() => {
  if (!props.room) return 0;

  let totalExtra = 0;
  addedExtra.value.forEach((item) => {
    totalExtra += item.price;
  });
  if (props.isWithBreakfast) {
    let total =
      props.room.priceWithBreakfast * props.qty * props.nights + totalExtra;
    return total;
  } else {
    let total = props.room.price * props.qty * props.nights + totalExtra;
    return total;
  }
});

const tax = computed<number>(() => {
  let taxFee = (subTotal.value * 11) / 100;
  let serviceFee = (subTotal.value * 10) / 100;
  return taxFee + serviceFee;
});

interface ExtraOption {
  id: number;
  name: string;
  price: number;
}

const extras = ref<ExtraOption[]>([
  {
    id: 1,
    name: "Airport Transfer Service",
    price: 250000,
  },
  {
    id: 2,
    name: "Pool Flower Decoration",
    price: 4500000,
  },
]);

const addedExtra = ref<ExtraOption[]>([]);
const selectedBedType = ref<string>("");
const isBookingForOther = ref<boolean>(false);
const agreedToTerms = ref<boolean>(false);
const etaTime = ref<string>();

interface GuestPayload {
  guest_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: Date;
  check_out_date: Date;
}

interface ExtraOptionPayload {
  extra_option_id: number;
  quantity: number;
}

const formData = reactive<GuestPayload>({
  guest_name: "",
  guest_last_name: "",
  guest_email: "",
  guest_phone: "",
  check_in_date: props.checkIn || new Date(),
  check_out_date: props.checkOut || new Date(),
});

const isLoading = ref<boolean>(false);
const router = useRouter();
const booking = async () => {
  if (!props.room) return;
  isLoading.value = true;
  let extraOption: ExtraOptionPayload[] = [];
  addedExtra.value.forEach((item) => {
    extraOption.push({
      extra_option_id: item.id,
      quantity: 1,
    });
  });

  try {
    await useCsFetch(`/bookings`, {
      method: "POST",
      body: {
        room_id: props.room.id,
        room_quantity: props.qty,
        include_breakfast: props.isWithBreakfast,
        extra_options: extraOption,
        guest_name: `${formData.guest_name} ${formData.guest_last_name}`,
        guest_email: formData.guest_email,
        guest_phone: formData.guest_phone,
        check_in_date: formData.check_in_date,
        check_out_date: formData.check_out_date,
      },
      onResponse({ response }) {
        if (response.status != 201) return;
        // router.replace(response._data.data.payment.xendit_invoice_url);
        window.location.replace(response._data.data.payment.xendit_invoice_url);
      },
    });
  } catch (error: any) {
    let msg = getErrorFetchMessage(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section
    class="container mt-20 px-5 xl:px-0 mx-auto max-w-[1256px] relative grid md:grid-cols-12 gap-4 pt-5 md:mt-0 pb-32"
  >
    <div class="md:col-span-7 flex flex-col gap-4">
      <div
        class="p-4 md:p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6"
      >
        <p class="font-bold text-lg md:text-xl mt-2 md:col-span-2">
          Booking Details
        </p>
        <div class="flex flex-col gap-2">
          <label for="firstName"
            ><span class="text-red-500">*</span
            ><span class="text-gray-400">First Name</span></label
          >
          <input
            v-model="formData.guest_name"
            type="text"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="lasttName"
            ><span class="text-red-500">*</span
            ><span class="text-gray-400">Last Name</span></label
          >
          <input
            type="text"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="lasttName"
            ><span class="text-gray-400">Bedding</span></label
          >
          <select
            v-model="selectedBedType"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          >
            <option value="" disabled>Select bed type</option>
            <option v-for="bed in bedType" :key="bed" :value="bed">
              {{ bed }}
            </option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="adult"><span class="text-gray-400">Adult</span></label>
            <input
              type="number"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
              :value="adults"
              readonly
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="childer"
              ><span class="text-gray-400">Child</span></label
            >
            <input
              type="number"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
              :value="children"
              readonly
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label for="notes"
            ><span class="text-gray-400">Special Request</span></label
          >
          <input
            type="text"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="eta"
            ><span class="text-gray-400">Estimated Arrival Time</span></label
          >
          <input
            type="time"
            v-model="etaTime"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          />
        </div>
      </div>

      <div class="p-4 md:p-10 bg-white grid md:grid-cols-2 gap-x-4 gap-y-6">
        <p class="font-bold text-lg md:text-xl mt-2 md:col-span-2">
          Contact Details
        </p>
        <div class="md:col-span-2 flex items-center gap-3">
          <button
            type="button"
            class="w-10 h-6 flex items-center rounded-full transition"
            :class="isBookingForOther ? 'bg-sarva-green' : 'bg-gray-300'"
            @click="isBookingForOther = !isBookingForOther"
          >
            <span
              class="w-5 h-5 bg-white rounded-full shadow transform transition"
              :class="isBookingForOther ? 'translate-x-4' : 'translate-x-1'"
            />
          </button>

          <span class="text-gray-600"> I'm booking for someone else </span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="phone"
            ><span class="text-red-500">*</span
            ><span class="text-gray-400">Phone Number</span></label
          >
          <input
            v-model="formData.guest_phone"
            type="text"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email"
            ><span class="text-red-500">*</span
            ><span class="text-gray-400">Email</span></label
          >
          <input
            v-model="formData.guest_email"
            type="text"
            class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
          />
        </div>
      </div>
      <div class="p-4 md:p-10 bg-white">
        <p class="font-bold text-lg md:text-xl mt-2 md:col-span-2">
          Optional Extras
        </p>
        <ul class="w-full mt-6">
          <li
            v-for="item in extras"
            class="flex justify-between w-full not-first:mt-10"
          >
            <div class="flex flex-col gap-2">
              <p>{{ item.name }}</p>
              <p class="text-sm text-gray-400 flex items-center gap-1">
                More Info
                <Icon name="mynaui:arrow-up-right" size="1rem" class="mt-0.5" />
              </p>
            </div>
            <div
              class="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-10"
            >
              <span class="font-bold text-lg"
                >IDR{{ formatCurrency(item.price) }}</span
              >
              <button
                v-if="!addedExtra.includes(item)"
                class="w-fit bg-sarva-green text-center text-white px-6 py-3 cursor-pointer transition-all md:w-full"
                @click="addedExtra.push(item)"
              >
                Add
              </button>
              <div v-else class="text-sarva-green">
                <Icon name="mynaui:check-circle-one" />
                Added
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="md:col-span-5 bg-sarva-green text-white h-fit">
      <div class="w-full h-[180px] md:h-[280px]">
        <img
          :src="room?.image"
          class="w-full h-full object-cover"
          alt="image room"
        />
      </div>
      <div class="p-4 md:p-8">
        <p class="font-medium text-2xl md:text-xl">
          {{ room?.title }}
        </p>
        <table class="mt-6 w-full">
          <tbody>
            <tr class="">
              <td class="text-white/50 w-fit text-nowrap">Check In</td>
              <td class="text-white/80 py-2 px-6">:</td>
              <td class="">{{ formatDate(checkIn ?? "", "ddMMyyyy") }}</td>
            </tr>
            <tr class="">
              <td class="text-white/50 w-fit text-nowrap">Check Out</td>
              <td class="text-white/80 px-6 py-2">:</td>
              <td class="">{{ formatDate(checkOut ?? "", "ddMMyyyy") }}</td>
            </tr>
            <tr>
              <td class="text-white/50 w-fit text-nowrap">Guest</td>
              <td class="text-white/80 px-6 py-2">:</td>
              <td class="w-full">
                <div class="flex items-center gap-2">
                  <span
                    >{{ adults }} Adult<span v-if="adults !== 1">s</span>
                  </span>
                  <div v-if="children > 0" class="">
                    {{ children }} Child<span v-if="children !== 1">ren</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-6 pt-6 border-t border-white/50">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>IDR{{ formatCurrency(subTotal) }}</span>
          </div>
          <div class="flex justify-between mt-4">
            <span>Tax (11%) & Service (10%)</span>
            <span>IDR{{ formatCurrency(tax) }}</span>
          </div>
          <div class="flex justify-between mt-4">
            <span>Total</span>
            <span class="font-bold text-xl"
              >IDR{{ formatCurrency(subTotal + tax) }}</span
            >
          </div>
        </div>
        <div class="flex items-center">
          <label class="flex items-start gap-3 mt-6 text-sm">
            <input
              type="checkbox"
              v-model="agreedToTerms"
              class="mt-1 accent-white"
            />
            <span>
              By booking, you have agreed to our
              <span class="underline cursor-pointer">Terms and Conditions</span>
              |
              <span class="underline cursor-pointer">Payment Terms</span>
            </span>
          </label>
        </div>
        <button
          @click="booking"
          class="mt-8 font-bold bg-primary text-center text-xl hover:bg-primary-darker text-white px-6 py-3 cursor-pointer transition-all w-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  </section>
</template>
