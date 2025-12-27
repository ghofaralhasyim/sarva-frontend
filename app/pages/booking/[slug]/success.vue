<script lang="ts" setup>
definePageMeta({
  layout: "layout2",
})

const route = useRoute()
const router = useRouter()

type BookingExtra = {
  id: number
  quantity: number
  price: number
  total_price: number
  extra_option: { name: string; description?: string; price: number }
}

type Booking = {
  id: number
  booking_code: string
  status: string
  total_amount: number
  room_total: number
  extras_total: number
  nights: number
  room_quantity: number
  include_breakfast: boolean
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in_date: string
  check_out_date: string
  room: { name: string; image_url: string; capacity: number }
  payment?: {
    amount: number
    status: string
    paid_at?: string
    xendit_invoice_id?: string
    xendit_invoice_url?: string
  } | null
  booking_extras?: BookingExtra[]
}

const booking = ref<Booking | null>(null)
const loading = ref(true)
const errorMsg = ref<string | null>(null)

function formatMoney(idr: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(idr ?? 0)
}

function formatDateTime(iso?: string) {
  if (!iso) return "-"
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleString("id-ID")
}

function formatDate(iso?: string) {
  if (!iso) return "-"
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
}

const bookingId = computed(() => {
  const v = route.params.slug
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
})

const bookingCode = computed(() => {
  const v = route.params.slug
  return typeof v === "string" ? v : ""
})

async function fetchBooking() {
  loading.value = true
  errorMsg.value = null

  try {
    let res: any = null

    if (bookingCode.value) {
  
      try {
        res = await useCsFetch<{ data: Booking }>(`/bookings/details/${bookingCode.value}`, { method: "GET" })
      } catch {
        res = await useCsFetch<{ data: Booking }>(`/bookings/details/${bookingCode.value}`, { method: "GET" })
      }
    } else if (bookingId.value) {
      res = await useCsFetch<{ data: Booking }>(`/bookings/${bookingId.value}`, { method: "GET" })
    } else {
      throw new Error("Missing booking identifier. Use ?code=BOOKING_CODE or ?id=BOOKING_ID")
    }

    booking.value = res.data

    if (
      booking.value?.payment?.status &&
      booking.value.payment.status.toLowerCase() !== "paid"
    ) {
      errorMsg.value = "Payment is not marked as paid yet. Please refresh in a moment."
    }
  } catch (err: any) {
    errorMsg.value = err?.message || "Failed to load booking."
  } finally {
    loading.value = false
  }
}

await fetchBooking()

watch(
  () => route.query,
  () => fetchBooking(),
  { deep: true }
)
</script>

<template>
  <div class="bg-[#f1f1f1] min-h-dvh px-4 md:px-6 lg:px-0 pt-28 py-10">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="rounded-xl bg-white border border-gray-200 p-5 md:p-7">
        <div class="flex items-start gap-4">
          <div class="shrink-0 rounded-full bg-green-100 p-3">
            <Icon name="mynaui:check-circle-one" class="text-green-600" size="1.6rem" />
          </div>

          <div class="min-w-0 flex-1">
            <h1 class="text-lg md:text-2xl font-semibold text-gray-900">
              Payment successful 🎉
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Your booking is confirmed. We’ve sent the details to
              <span class="font-medium">{{ booking?.guest_email || "-" }}</span>.
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Booking code: <span class="ml-1 font-semibold">{{ booking?.booking_code || "-" }}</span>
              </span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="booking?.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
              >
                Status: <span class="ml-1 font-semibold">{{ booking?.status || "-" }}</span>
              </span>
              <span
                v-if="booking?.payment?.status"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
              >
                Payment: <span class="ml-1 font-semibold">{{ booking?.payment?.status }}</span>
              </span>
            </div>
          </div>
        </div>

        <div v-if="errorMsg" class="mt-4 rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
          {{ errorMsg }}
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-4 rounded-xl bg-white border border-gray-200 p-6 text-gray-600">
        Loading booking details...
      </div>

      <!-- Content -->
      <div v-else class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Left: Summary -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Room -->
          <div class="rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-56 h-40 sm:h-auto bg-gray-100">
                <img
                  v-if="booking?.room?.image_url"
                  :src="booking.room.image_url"
                  class="w-full h-full object-cover"
                  alt="Room image"
                />
              </div>
              <div class="p-5 flex-1">
                <div class="text-sm text-gray-500">Room</div>
                <div class="text-lg font-semibold text-gray-900">
                  {{ booking?.room?.name || "-" }}
                </div>
                <div class="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div class="rounded-md bg-gray-50 border border-gray-200 p-3">
                    <div class="text-gray-500 text-xs">Check-in</div>
                    <div class="font-medium text-gray-900">{{ formatDate(booking?.check_in_date) }}</div>
                  </div>
                  <div class="rounded-md bg-gray-50 border border-gray-200 p-3">
                    <div class="text-gray-500 text-xs">Check-out</div>
                    <div class="font-medium text-gray-900">{{ formatDate(booking?.check_out_date) }}</div>
                  </div>
                  <div class="rounded-md bg-gray-50 border border-gray-200 p-3">
                    <div class="text-gray-500 text-xs">Guests</div>
                    <div class="font-medium text-gray-900">
                      {{ booking?.room?.capacity ?? "-" }} max
                    </div>
                  </div>
                  <div class="rounded-md bg-gray-50 border border-gray-200 p-3">
                    <div class="text-gray-500 text-xs">Nights / Qty</div>
                    <div class="font-medium text-gray-900">
                      {{ booking?.nights ?? "-" }} night(s) • {{ booking?.room_quantity ?? "-" }} room(s)
                    </div>
                  </div>
                </div>

                <div class="mt-3 text-sm text-gray-700">
                  Breakfast:
                  <span class="font-medium">
                    {{ booking?.include_breakfast ? "Included" : "Not included" }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Guest -->
          <div class="rounded-xl bg-white border border-gray-200 p-5">
            <h2 class="font-semibold text-gray-900">Guest info</h2>
            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div class="rounded-md bg-gray-50 border border-gray-200 p-3">
                <div class="text-gray-500 text-xs">Name</div>
                <div class="font-medium text-gray-900">{{ booking?.guest_name || "-" }}</div>
              </div>
              <div class="rounded-md bg-gray-50 border border-gray-200 p-3">
                <div class="text-gray-500 text-xs">Phone</div>
                <div class="font-medium text-gray-900">{{ booking?.guest_phone || "-" }}</div>
              </div>
              <div class="rounded-md bg-gray-50 border border-gray-200 p-3 sm:col-span-2">
                <div class="text-gray-500 text-xs">Email</div>
                <div class="font-medium text-gray-900">{{ booking?.guest_email || "-" }}</div>
              </div>
            </div>
          </div>

          <!-- Extras -->
          <div class="rounded-xl bg-white border border-gray-200 p-5">
            <h2 class="font-semibold text-gray-900">Optional extras</h2>

            <div v-if="!booking?.booking_extras?.length" class="mt-3 text-sm text-gray-500">
              No extras selected.
            </div>

            <ul v-else class="mt-3 divide-y divide-gray-200">
              <li v-for="x in booking.booking_extras" :key="x.id" class="py-3 flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <div class="font-medium text-gray-900">{{ x.extra_option.name }}</div>
                  <div class="text-xs text-gray-500">
                    {{ x.extra_option.description || "" }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    Qty: {{ x.quantity }} • {{ formatMoney(x.price) }}
                  </div>
                </div>
                <div class="shrink-0 font-semibold text-gray-900">
                  {{ formatMoney(x.total_price) }}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Payment summary -->
        <div class="space-y-4">
          <div class="rounded-xl bg-white border border-gray-200 p-5">
            <h2 class="font-semibold text-gray-900">Payment summary</h2>

            <div class="mt-4 space-y-3 text-sm">
              <div class="flex justify-between gap-4">
                <span class="text-gray-600">Room total</span>
                <span class="font-medium text-gray-900">{{ formatMoney(booking?.room_total ?? 0) }}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span class="text-gray-600">Extras total</span>
                <span class="font-medium text-gray-900">{{ formatMoney(booking?.extras_total ?? 0) }}</span>
              </div>

              <div class="pt-3 border-t border-gray-200 flex justify-between gap-4">
                <span class="text-gray-900 font-semibold">Total paid</span>
                <span class="text-gray-900 font-semibold">{{ formatMoney(booking?.payment?.amount ?? booking?.total_amount ?? 0) }}</span>
              </div>

              <div class="mt-4 rounded-md bg-gray-50 border border-gray-200 p-3">
                <div class="text-xs text-gray-500">Paid at</div>
                <div class="text-sm font-medium text-gray-900">
                  {{ formatDateTime(booking?.payment?.paid_at) }}
                </div>

                <div v-if="booking?.payment?.xendit_invoice_id" class="mt-2">
                  <div class="text-xs text-gray-500">Invoice ID</div>
                  <div class="text-xs font-mono text-gray-800 break-all">
                    {{ booking.payment.xendit_invoice_id }}
                  </div>
                </div>

                <!-- <a
                  v-if="booking?.payment?.xendit_invoice_url"
                  class="mt-3 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
                  :href="booking.payment.xendit_invoice_url"
                  target="_blank"
                  rel="noreferrer"
                >
                  View invoice
                  <Icon name="mynaui:arrow-up-right" />
                </a> -->
              </div>

              <div class="pt-3 flex flex-col gap-2">
                <NuxtLink
                  to="/"
                  class="w-full text-center rounded-md bg-black text-white py-2.5 font-medium hover:opacity-90 transition"
                >
                  Back to home
                </NuxtLink>

                <!-- <button
                  type="button"
                  class="w-full text-center rounded-md border border-gray-300 bg-white py-2.5 font-medium text-gray-800 hover:bg-gray-50 transition"
                  @click="router.push('/bookings')"
                >
                  View my bookings
                </button> -->
              </div>
            </div>
          </div>

          <div class="rounded-xl bg-white border border-gray-200 p-5 text-sm text-gray-600">
            Need help? Contact us with your booking code:
            <span class="font-semibold text-gray-900">{{ booking?.booking_code || "-" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
