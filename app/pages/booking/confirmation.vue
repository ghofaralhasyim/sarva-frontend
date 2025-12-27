<script lang="ts" setup>
import type { Villa, ApiRoom } from "~/types/types"

definePageMeta({
  layout: "layout2",
});

type DateRange = [Date, Date] | []

const route = useRoute()
const router = useRouter()

function toInt(v: unknown, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function toBool(v: unknown, fallback = false) {
  if (typeof v === "boolean") return v
  if (typeof v === "string") return v.toLowerCase() === "true"
  return fallback
}

function parseDDMMYYYY(v: unknown): Date | undefined {
  if (typeof v !== "string") return undefined
  const [dd, mm, yyyy] = v.split("-").map(Number)
  if (!dd || !mm || !yyyy) return undefined
  const d = new Date(yyyy, mm - 1, dd)
  if (Number.isNaN(d.getTime())) return undefined
  return d
}

function toYMD(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function mapApiRoomToVilla(r: ApiRoom): Villa {
  return {
    id: r.id,
    price: r.price_per_night,
    priceWithBreakfast: r.price_with_breakfast,
    capacity: r.capacity,
    title: r.name,
  } as unknown as Villa
}

const roomId = computed(() => toInt(route.query.id, 0))
const adults = computed(() => toInt(route.query.adults, 1))
const children = computed(() => toInt(route.query.children, 0))
const qty = computed(() => Math.max(1, toInt(route.query.qty, 1)))
const isWithBreakfast = computed(() => toBool(route.query.isWithBreakfast, false))

const checkIn = computed<Date | undefined>(() => parseDDMMYYYY(route.query.checkIn))
const checkOut = computed<Date | undefined>(() => parseDDMMYYYY(route.query.checkOut))

const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0
  const ms = checkOut.value.getTime() - checkIn.value.getTime()
  const n = Math.ceil(ms / (1000 * 60 * 60 * 24))
  return Math.max(0, n)
})

const villa = ref<Villa | undefined>(undefined)


const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const dateRange = ref<DateRange>([
  checkIn.value ?? today,
  checkOut.value ?? tomorrow,
])

async function loadRoomById() {
  if (!roomId.value) return

  // if query has dates, use them; else use current dateRange
  const cin = checkIn.value ?? dateRange.value[0]
  const cout = checkOut.value ?? dateRange.value[1]

  if (!cin || !cout) return

  try {
    const res = await useCsFetch<{ data: ApiRoom[] }>(
      `/rooms?check_in_date=${toYMD(cin)}&check_out_date=${toYMD(cout)}`,
      { method: "GET" }
    )

    const found = res?.data?.find((r) => r.id === roomId.value)
    villa.value = found ? mapApiRoomToVilla(found) : undefined

    // optional: if not found, redirect or show message
    // if (!villa.value) router.replace("/rooms")
  } catch (err) {
    console.error(err)
  }
}

/** call at start + when query changes */
await loadRoomById()

watch(
  () => route.query,
  async () => {
    // update dateRange if query changed
    dateRange.value = [
      checkIn.value ?? today,
      checkOut.value ?? tomorrow,
    ]
    await loadRoomById()
  },
  { deep: true }
)

/** -------- computed totals -------- */
interface ExtraOption {
  id: number
  name: string
  price: number
}

const extras = ref<ExtraOption[]>([
  { id: 1, name: "Airport Transfer Service", price: 250000 },
  { id: 2, name: "Pool Flower Decoration", price: 4500000 },
])

const addedExtra = ref<ExtraOption[]>([])

const subTotal = computed<number>(() => {
  if (!villa.value) return 0

  const base =
    (isWithBreakfast.value
      ? (villa.value as any).priceWithBreakfast
      : (villa.value as any).price) ?? 0

  return base * qty.value * nights.value
})

const subTotalExtra = computed<number>(() => {

  if (!villa.value) return 0
  const totalExtra = addedExtra.value.reduce((sum, item) => sum + item.price, 0)
  
  return totalExtra
})

const tax = computed<number>(() => {
  const taxFee = (subTotal.value * 11) / 100
  const serviceFee = ((subTotal.value + subTotalExtra.value) * 10) / 100
  return taxFee + serviceFee
})

/** -------- form + booking -------- */
const selectedBedType = ref("")
const isBookingForOther = ref(false)
const agreedToTerms = ref(false)
const etaTime = ref<string>()

interface GuestPayload {
  guest_name: string
  guest_last_name: string
  guest_email: string
  guest_phone: string
  check_in_date: Date
  check_out_date: Date
}

interface ExtraOptionPayload {
  extra_option_id: number
  quantity: number
}

const formData = reactive<GuestPayload>({
  guest_name: "",
  guest_last_name: "",
  guest_email: "",
  guest_phone: "",
  check_in_date: checkIn.value ?? new Date(),
  check_out_date: checkOut.value ?? new Date(),
})

watch([checkIn, checkOut], () => {
  if (checkIn.value) formData.check_in_date = checkIn.value
  if (checkOut.value) formData.check_out_date = checkOut.value
})

const isLoading = ref(false)

const booking = async () => {
  if (!villa.value) return
  if (!agreedToTerms.value) return

  isLoading.value = true

  const extraOption: ExtraOptionPayload[] = addedExtra.value.map((x) => ({
    extra_option_id: x.id,
    quantity: 1,
  }))

  try {
    await useCsFetch(`/bookings`, {
      method: "POST",
      body: {
        room_id: (villa.value as any).id,
        room_quantity: qty.value,
        include_breakfast: isWithBreakfast.value,
        extra_options: extraOption,
        guest_name: `${formData.guest_name} ${formData.guest_last_name}`.trim(),
        guest_email: formData.guest_email,
        guest_phone: formData.guest_phone,
        check_in_date: formData.check_in_date,
        check_out_date: formData.check_out_date,
      },
      onResponse({ response }: any) {
        if (response.status !== 201) return
        window.location.replace(response._data.data.payment.xendit_invoice_url)
      },
    })
  } catch (error: any) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const checkAvailability = async () => {
  if (dateRange.value.length !== 2) return
  await loadRoomById()
}

const bedType = ["1 Queen-size Bed", "1 King Size"]
</script>


<template>
  <div class="bg-[#f1f1f1] pt-38">
  <section
    class="container px-5 xl:px-0 mx-auto max-w-[1256px] relative grid md:grid-cols-12 gap-4 pt-5 md:mt-0 pb-32"
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
              class="bg-[#dedede] py-2 px-4 outline-sarva-green"
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
              class="bg-[#dedede] py-2 px-4 outline-sarva-green"
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
          :src="`/img/villas/${roomId}.jpg`"
          class="w-full h-full object-cover"
          alt="image room"
        />
      </div>
      <div class="p-4 md:p-8">
        <p class="font-medium text-2xl md:text-xl">
          {{ villa?.title }}
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
             <tr class="">
              <td class="text-white/50 w-fit text-nowrap">Qty</td>
              <td class="text-white/80 px-6 py-2">:</td>
              <td class="">{{ qty }} Unit<span v-if="qty>1">s</span></td>
            </tr>
          </tbody>
        </table>
        <div class="mt-6 pt-6 border-t border-white/50">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>IDR{{ formatCurrency(subTotal) }}</span>
          </div>
          <div v-if="subTotalExtra > 0" class="flex justify-between mt-4">
            <span>Extra</span>
            <span>IDR{{ formatCurrency(subTotalExtra) }}</span>
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
  </div>
</template>
