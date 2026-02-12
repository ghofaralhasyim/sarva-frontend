<script lang="ts" setup>
import type { Villa, ApiRoom, Voucher } from "~/types/types";

definePageMeta({
  layout: "layout2",
});

type DateRange = [Date, Date] | [];

const route = useRoute();

function toInt(v: unknown, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function toBool(v: unknown, fallback = false) {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.toLowerCase() === "true";
  return fallback;
}

function parseDDMMYYYY(v: unknown): Date | undefined {
  if (typeof v !== "string") return undefined;
  const [dd, mm, yyyy] = v.split("-").map(Number);
  if (!dd || !mm || !yyyy) return undefined;
  const d = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function mapApiRoomToVilla(r: ApiRoom): Villa {
  return {
    id: r.id,
    price: r.price_per_night,
    priceWithBreakfast: r.price_with_breakfast,
    capacity: r.capacity,
    title: r.name,
  } as unknown as Villa;
}

const roomId = computed(() => toInt(route.query.id, 0));
const adults = computed(() => toInt(route.query.adults, 1));
const children = computed(() => toInt(route.query.children, 0));
const qty = computed(() => Math.max(1, toInt(route.query.qty, 1)));
const isWithBreakfast = computed(() =>
  toBool(route.query.isWithBreakfast, false),
);

const checkIn = computed<Date | undefined>(() =>
  parseDDMMYYYY(route.query.checkIn),
);
const checkOut = computed<Date | undefined>(() =>
  parseDDMMYYYY(route.query.checkOut),
);

const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0;
  const ms = checkOut.value.getTime() - checkIn.value.getTime();
  const n = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(0, n);
});

const villa = ref<Villa | undefined>(undefined);

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dateRange = ref<DateRange>([
  checkIn.value ?? today,
  checkOut.value ?? tomorrow,
]);

async function loadRoomById() {
  if (!roomId.value) return;

  const cin = checkIn.value ?? dateRange.value[0];
  const cout = checkOut.value ?? dateRange.value[1];

  if (!cin || !cout) return;

  try {
    const res = await useCsFetch<{ data: ApiRoom[] }>(
      `/rooms?check_in_date=${toYMD(cin)}&check_out_date=${toYMD(cout)}`,
      { method: "GET" },
    );

    const found = res?.data?.find((r) => r.id === roomId.value);
    villa.value = found ? mapApiRoomToVilla(found) : undefined;
  } catch (err) {
    console.error(err);
  }
}

await loadRoomById();

watch(
  () => route.query,
  async () => {
    dateRange.value = [checkIn.value ?? today, checkOut.value ?? tomorrow];
    await loadRoomById();
  },
  { deep: true },
);

interface ExtraOption {
  id: number;
  name: string;
  price: number;
}

const extras = ref<ExtraOption[]>([
  { id: 1, name: "Airport Transfer Service", price: 250000 },
  { id: 2, name: "Pool Flower Decoration", price: 4500000 },
]);

const addedExtra = ref<ExtraOption[]>([]);

const removeExtra = (id: number) => {
  const idx = addedExtra.value.findIndex((item: ExtraOption) => item.id === id);
  if (idx !== -1) {
    addedExtra.value.splice(idx, 1);
  }
};

const subTotal = computed<number>(() => {
  if (!villa.value) return 0;
  const base =
    (isWithBreakfast.value
      ? (villa.value as any).priceWithBreakfast
      : (villa.value as any).price) ?? 0;
  return base * qty.value * nights.value;
});

const subTotalExtra = computed<number>(() => {
  if (!villa.value) return 0;
  const totalExtra = addedExtra.value.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  return totalExtra;
});

const tax = computed<number>(() => {
  const taxFee =
    ((subTotal.value + subTotalExtra.value - voucherDiscount.value) * 11) / 100;
  const serviceFee =
    ((subTotal.value + subTotalExtra.value - voucherDiscount.value) * 10) / 100;
  return taxFee + serviceFee;
});

const selectedBedType = ref("1 Queen-size Bed");
const isBookingForOther = ref(false);
const agreedToTerms = ref(false);
const etaTime = ref<string>();

interface GuestPayload {
  guest_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: Date;
  check_out_date: Date;
  notes: string;
  guest_other_name: string;
  guest_other_email: string;
  guest_other_phone: string;
  voucher_codes: string[];
  guest_other_phone_country: string;
  guest_phone_country: string;
  dietary_restriction: string;
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
  check_in_date: checkIn.value ?? new Date(),
  check_out_date: checkOut.value ?? new Date(),
  notes: "",
  guest_other_name: "",
  guest_other_email: "",
  guest_other_phone: "",
  voucher_codes: [],
  guest_phone_country: "62", // Default Indonesia
  guest_other_phone_country: "62",
  dietary_restriction: "",
});

watch([checkIn, checkOut], () => {
  if (checkIn.value) formData.check_in_date = checkIn.value;
  if (checkOut.value) formData.check_out_date = checkOut.value;
});

const errors = reactive<Record<string, string>>({
  guest_name: "",
  guest_last_name: "",
  guest_phone: "",
  guest_phone_country: "",
  guest_email: "",
  guest_other_phone: "",
  guest_other_phone_country: "",
  guest_other_email: "",
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 8 && cleaned.length <= 15;
}

function validateField(field: keyof typeof errors) {
  errors[field] = "";

  if (field === "guest_name") {
    if (!formData.guest_name.trim())
      errors.guest_name = "First name is required";
  }

  if (field === "guest_last_name") {
    if (!formData.guest_last_name.trim())
      errors.guest_last_name = "Last name is required";
  }

  if (field === "guest_email") {
    if (!formData.guest_email.trim()) errors.guest_email = "Email is required";
    else if (!isValidEmail(formData.guest_email))
      errors.guest_email = "Email is invalid";
  }

  if (field === "guest_phone_country") {
    if (!formData.guest_phone_country.trim())
      errors.guest_phone_country = "Country code is required";
  }

  if (field === "guest_phone") {
    if (!formData.guest_phone) errors.guest_phone = "Phone is required";
    else if (!validatePhoneNumber(formData.guest_phone))
      errors.guest_phone = "Invalid phone number";
  }

  if (field === "guest_other_phone_country" && isBookingForOther.value) {
    if (!formData.guest_other_phone_country.trim())
      errors.guest_other_phone_country = "Country code is required";
  }

  if (field === "guest_other_phone" && isBookingForOther.value) {
    if (!formData.guest_other_phone)
      errors.guest_other_phone = "Phone is required";
    else if (!validatePhoneNumber(formData.guest_other_phone))
      errors.guest_other_phone = "Invalid phone number";
  }

  if (field === "guest_other_email") {
    if (isBookingForOther.value) {
      if (!formData.guest_other_email.trim())
        errors.guest_other_email = "Email is required";
      else if (!isValidEmail(formData.guest_other_email))
        errors.guest_other_email = "Email is invalid";
    }
  }
}

function validateAll() {
  validateField("guest_name");
  validateField("guest_last_name");
  validateField("guest_phone_country");
  validateField("guest_phone");
  validateField("guest_email");

  if (isBookingForOther.value) {
    validateField("guest_other_phone_country");
    validateField("guest_other_phone");
    validateField("guest_other_email");
  }

  return Object.values(errors).every((v) => !v);
}

const isFormValid = computed(() => {
  const baseOk =
    formData.guest_name.trim() &&
    formData.guest_last_name.trim() &&
    formData.guest_phone_country.trim() &&
    validatePhoneNumber(formData.guest_phone) &&
    isValidEmail(formData.guest_email);

  if (!isBookingForOther.value) return !!baseOk;

  return (
    baseOk &&
    formData.guest_other_phone_country.trim() &&
    validatePhoneNumber(formData.guest_other_phone) &&
    isValidEmail(formData.guest_other_email)
  );
});

const fieldIdMap: Record<keyof typeof errors, string> = {
  guest_name: "guest_name",
  guest_last_name: "guest_last_name",
  guest_phone_country: "guest_phone_country",
  guest_phone: "guest_phone",
  guest_email: "guest_email",
  guest_other_phone_country: "guest_other_phone_country",
  guest_other_phone: "guest_other_phone",
  guest_other_email: "guest_other_email",
};

function scrollToFirstError() {
  const order: (keyof typeof errors)[] = [
    "guest_name",
    "guest_last_name",
    "guest_phone_country",
    "guest_phone",
    "guest_email",
    "guest_other_phone_country",
    "guest_other_phone",
    "guest_other_email",
  ];

  const firstInvalid = order.find((k) => !!errors[k]);
  if (!firstInvalid) return;

  const id = fieldIdMap[firstInvalid] || "";
  const el = document.getElementById(id) as HTMLElement | null;

  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => (el as HTMLInputElement)?.focus?.(), 200);
  }
}

const isLoading = ref(false);
const bookingError = ref<string>("");

watch(isBookingForOther, (v) => {
  if (!v) {
    formData.guest_other_phone = "";
    formData.guest_other_phone_country = "62";
    formData.guest_other_email = "";
    errors.guest_other_phone = "";
    errors.guest_other_phone_country = "";
    errors.guest_other_email = "";
  }
});

const booking = async () => {
  if (!villa.value) return;

  const ok = validateAll();
  if (!ok) {
    scrollToFirstError();
    return;
  }

  if (!agreedToTerms.value) {
    bookingError.value = "Please agree to the Terms and Conditions to proceed.";
    return;
  }

  isLoading.value = true;
  bookingError.value = "";

  const extraOption: ExtraOptionPayload[] = addedExtra.value.map((x) => ({
    extra_option_id: x.id,
    quantity: 1,
  }));

  // Combine country code with phone number for API payload
  const fullGuestPhone = `+${formData.guest_phone_country}${formData.guest_phone}`;
  const fullOtherGuestPhone = isBookingForOther.value
    ? `+${formData.guest_other_phone_country}${formData.guest_other_phone}`
    : "";

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
        guest_phone: fullGuestPhone,

        check_in_date: toYMD(formData.check_in_date) + "T23:59:59Z",
        check_out_date: toYMD(formData.check_out_date) + "T23:59:59Z",
        notes: formData.notes,

        is_for_other: isBookingForOther.value,
        guest_other_name: isBookingForOther.value
          ? formData.guest_other_name.trim()
          : "",
        guest_other_email: isBookingForOther.value
          ? formData.guest_other_email.trim()
          : "",
        guest_other_phone: fullOtherGuestPhone,

        eta: etaTime.value,
        bed_type: selectedBedType.value,
        voucher_codes: formData.voucher_codes,
        dietary_restriction: isHaveDietRestric
          ? formData.dietary_restriction
          : "none",
      },
      onResponse({ response }: any) {
        if (response.status !== 201) return;
        window.location.replace(response._data.data.payment.xendit_invoice_url);
      },
    });
  } catch (error: any) {
    bookingError.value = error.response._data.error;
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const bedType = ["1 Queen-size Bed", "1 King Size"];

const isHaveDietRestric = ref<boolean>(false);

const voucherApplied = ref<Voucher[]>([]);
const voucherError = ref<string>("");
const voucherCode = ref<string>("");

const removeVoucher = (code: string) => {
  const idx = voucherApplied.value.findIndex(
    (item: Voucher) => item.code.toUpperCase() === code.toUpperCase(),
  );

  if (idx !== -1) {
    voucherApplied.value.splice(idx, 1);
  }
};

const validateVoucher = async () => {
  const exists = voucherApplied.value.some(
    (item: Voucher) =>
      item.code.toUpperCase() === voucherCode.value.toUpperCase(),
  );

  if (exists) {
    voucherError.value = "voucher already applied";
    return;
  }

  voucherError.value = "";
  try {
    await useCsFetch(`/vouchers/validate`, {
      method: "POST",
      body: {
        code: voucherCode.value,
        phone: formData.guest_other_phone,
        total_amount: subTotal.value + subTotalExtra.value,
        nights: nights.value,
      },
      onResponse({ response }: any) {
        if (response.status !== 200) return;
        if (!response._data.data.valid) {
          voucherError.value = response._data.data.message;
        } else {
          formData.voucher_codes.push(voucherCode.value);
          voucherApplied.value.push(response._data.data.voucher);
          voucherCode.value = "";
        }
      },
    });
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const voucherDiscount = computed<number>(() => {
  if (voucherApplied.value?.length < 1) return 0;

  let discount = 0;

  voucherApplied.value.forEach((item: Voucher) => {
    if (item.type == "percentage") {
      let discountPercent = subTotal.value * (item.value / 100);
      if (item.max_value != null && discountPercent > item.max_value) {
        discountPercent = item.max_value;
      }
      discount += discountPercent;
    } else {
      discount += Number(item.value);
    }
  });

  return discount;
});

// Country code options
const countryCodes = [
  { code: "93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "355", country: "Albania", flag: "🇦🇱" },
  { code: "213", country: "Algeria", flag: "🇩🇿" },
  { code: "376", country: "Andorra", flag: "🇦🇩" },
  { code: "244", country: "Angola", flag: "🇦🇴" },
  { code: "54", country: "Argentina", flag: "🇦🇷" },
  { code: "374", country: "Armenia", flag: "🇦🇲" },
  { code: "61", country: "Australia", flag: "🇦🇺" },
  { code: "43", country: "Austria", flag: "🇦🇹" },
  { code: "994", country: "Azerbaijan", flag: "🇦🇿" },

  { code: "973", country: "Bahrain", flag: "🇧🇭" },
  { code: "880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "375", country: "Belarus", flag: "🇧🇾" },
  { code: "32", country: "Belgium", flag: "🇧🇪" },
  { code: "501", country: "Belize", flag: "🇧🇿" },
  { code: "229", country: "Benin", flag: "🇧🇯" },
  { code: "975", country: "Bhutan", flag: "🇧🇹" },
  { code: "591", country: "Bolivia", flag: "🇧🇴" },
  { code: "387", country: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "55", country: "Brazil", flag: "🇧🇷" },
  { code: "673", country: "Brunei", flag: "🇧🇳" },
  { code: "359", country: "Bulgaria", flag: "🇧🇬" },

  { code: "855", country: "Cambodia", flag: "🇰🇭" },
  { code: "237", country: "Cameroon", flag: "🇨🇲" },
  { code: "1", country: "Canada", flag: "🇨🇦" },
  { code: "56", country: "Chile", flag: "🇨🇱" },
  { code: "86", country: "China", flag: "🇨🇳" },
  { code: "57", country: "Colombia", flag: "🇨🇴" },
  { code: "506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "385", country: "Croatia", flag: "🇭🇷" },
  { code: "53", country: "Cuba", flag: "🇨🇺" },
  { code: "357", country: "Cyprus", flag: "🇨🇾" },
  { code: "420", country: "Czech Republic", flag: "🇨🇿" },

  { code: "45", country: "Denmark", flag: "🇩🇰" },
  { code: "20", country: "Egypt", flag: "🇪🇬" },
  { code: "372", country: "Estonia", flag: "🇪🇪" },
  { code: "251", country: "Ethiopia", flag: "🇪🇹" },

  { code: "358", country: "Finland", flag: "🇫🇮" },
  { code: "33", country: "France", flag: "🇫🇷" },

  { code: "49", country: "Germany", flag: "🇩🇪" },
  { code: "30", country: "Greece", flag: "🇬🇷" },
  { code: "995", country: "Georgia", flag: "🇬🇪" },

  { code: "852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "36", country: "Hungary", flag: "🇭🇺" },

  { code: "62", country: "Indonesia", flag: "🇮🇩" },
  { code: "91", country: "India", flag: "🇮🇳" },
  { code: "98", country: "Iran", flag: "🇮🇷" },
  { code: "964", country: "Iraq", flag: "🇮🇶" },
  { code: "353", country: "Ireland", flag: "🇮🇪" },
  { code: "972", country: "Israel", flag: "🇮🇱" },
  { code: "39", country: "Italy", flag: "🇮🇹" },

  { code: "81", country: "Japan", flag: "🇯🇵" },
  { code: "962", country: "Jordan", flag: "🇯🇴" },

  { code: "7", country: "Kazakhstan", flag: "🇰🇿" },
  { code: "965", country: "Kuwait", flag: "🇰🇼" },
  { code: "82", country: "South Korea", flag: "🇰🇷" },

  { code: "856", country: "Laos", flag: "🇱🇦" },
  { code: "371", country: "Latvia", flag: "🇱🇻" },
  { code: "961", country: "Lebanon", flag: "🇱🇧" },
  { code: "370", country: "Lithuania", flag: "🇱🇹" },

  { code: "60", country: "Malaysia", flag: "🇲🇾" },
  { code: "960", country: "Maldives", flag: "🇲🇻" },
  { code: "356", country: "Malta", flag: "🇲🇹" },
  { code: "52", country: "Mexico", flag: "🇲🇽" },
  { code: "212", country: "Morocco", flag: "🇲🇦" },

  { code: "977", country: "Nepal", flag: "🇳🇵" },
  { code: "31", country: "Netherlands", flag: "🇳🇱" },
  { code: "64", country: "New Zealand", flag: "🇳🇿" },
  { code: "234", country: "Nigeria", flag: "🇳🇬" },
  { code: "47", country: "Norway", flag: "🇳🇴" },

  { code: "970", country: "Palestine", flag: "🇵🇸" },
  { code: "92", country: "Pakistan", flag: "🇵🇰" },
  { code: "63", country: "Philippines", flag: "🇵🇭" },
  { code: "48", country: "Poland", flag: "🇵🇱" },
  { code: "351", country: "Portugal", flag: "🇵🇹" },

  { code: "974", country: "Qatar", flag: "🇶🇦" },

  { code: "40", country: "Romania", flag: "🇷🇴" },
  { code: "7", country: "Russia", flag: "🇷🇺" },

  { code: "966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "65", country: "Singapore", flag: "🇸🇬" },
  { code: "421", country: "Slovakia", flag: "🇸🇰" },
  { code: "386", country: "Slovenia", flag: "🇸🇮" },
  { code: "27", country: "South Africa", flag: "🇿🇦" },
  { code: "34", country: "Spain", flag: "🇪🇸" },
  { code: "94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "46", country: "Sweden", flag: "🇸🇪" },
  { code: "41", country: "Switzerland", flag: "🇨🇭" },

  { code: "886", country: "Taiwan", flag: "🇹🇼" },
  { code: "66", country: "Thailand", flag: "🇹🇭" },
  { code: "90", country: "Turkey", flag: "🇹🇷" },

  { code: "971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "1", country: "United States", flag: "🇺🇸" },
  { code: "998", country: "Uzbekistan", flag: "🇺🇿" },

  { code: "58", country: "Venezuela", flag: "🇻🇪" },
  { code: "84", country: "Vietnam", flag: "🇻🇳" },

  { code: "967", country: "Yemen", flag: "🇾🇪" },
];

const showCountryDropdown = ref(false);
const showOtherCountryDropdown = ref(false);

const selectedCountry = computed(() =>
  countryCodes.find((c) => c.code === formData.guest_phone_country),
);

const selectedOtherCountry = computed(() =>
  countryCodes.find((c) => c.code === formData.guest_other_phone_country),
);

const selectCountry = (code: string) => {
  formData.guest_phone_country = code;
  showCountryDropdown.value = false;
  validateField("guest_phone_country");
};

const selectOtherCountry = (code: string) => {
  formData.guest_other_phone_country = code;
  showOtherCountryDropdown.value = false;
  validateField("guest_other_phone_country");
};

// Close dropdown when clicking outside
if (process.client) {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".country-dropdown")) {
      showCountryDropdown.value = false;
      showOtherCountryDropdown.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
}
</script>

<template>
  <div class="bg-[#f1f1f1] pt-24 lg:pt-38">
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
              id="guest_name"
              v-model="formData.guest_name"
              type="text"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
              :class="errors.guest_name ? 'border border-red-500' : ''"
              @input="validateField('guest_name')"
              @blur="validateField('guest_name')"
            />
            <p v-if="errors.guest_name" class="text-xs text-red-500 mt-1">
              {{ errors.guest_name }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="lasttName"
              ><span class="text-red-500">*</span
              ><span class="text-gray-400">Last Name</span></label
            >
            <input
              id="guest_last_name"
              v-model="formData.guest_last_name"
              type="text"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
              :class="errors.guest_last_name ? 'border border-red-500' : ''"
              @input="validateField('guest_last_name')"
              @blur="validateField('guest_last_name')"
            />
            <p v-if="errors.guest_last_name" class="text-xs text-red-500 mt-1">
              {{ errors.guest_last_name }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="phone"
              ><span class="text-red-500">*</span
              ><span class="text-gray-400">Phone Number</span></label
            >
            <div class="flex gap-2">
              <div class="relative country-dropdown">
                <button
                  type="button"
                  id="guest_phone_country"
                  class="bg-[#F5F5F5] py-2 px-3 outline-sarva-green w-28 flex items-center justify-between"
                  :class="
                    errors.guest_phone_country ? 'border border-red-500' : ''
                  "
                  @click="showCountryDropdown = !showCountryDropdown"
                >
                  <span
                    >{{ selectedCountry?.flag }} +{{
                      formData.guest_phone_country
                    }}</span
                  >
                  <Icon name="mynaui:chevron-down" size="1.2rem" />
                </button>
                <div
                  v-if="showCountryDropdown"
                  class="absolute z-50 top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto w-72"
                >
                  <button
                    v-for="item in countryCodes"
                    :key="item.code"
                    type="button"
                    class="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-left"
                    @click="selectCountry(item.code)"
                  >
                    <span class="text-xl">{{ item.flag }}</span>
                    <span class="flex-1">{{ item.country }}</span>
                    <span class="text-gray-500">+{{ item.code }}</span>
                  </button>
                </div>
              </div>
              <input
                id="guest_phone"
                v-model="formData.guest_phone"
                type="tel"
                placeholder="Enter phone number"
                class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green flex-1"
                :class="errors.guest_phone ? 'border border-red-500' : ''"
                @input="
                  (e) => {
                    formData.guest_phone = (
                      e.target as HTMLInputElement
                    ).value.replace(/\D/g, '');
                    validateField('guest_phone');
                  }
                "
                @blur="validateField('guest_phone')"
              />
            </div>
            <p
              v-if="errors.guest_phone_country"
              class="text-xs text-red-500 mt-1"
            >
              {{ errors.guest_phone_country }}
            </p>
            <p v-if="errors.guest_phone" class="text-xs text-red-500 mt-1">
              {{ errors.guest_phone }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="email"
              ><span class="text-red-500">*</span
              ><span class="text-gray-400">Email</span></label
            >
            <input
              id="guest_email"
              v-model="formData.guest_email"
              type="text"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
              :class="errors.guest_email ? 'border border-red-500' : ''"
              @input="validateField('guest_email')"
              @blur="validateField('guest_email')"
              placeholder="name@email.com"
            />
            <p v-if="errors.guest_email" class="text-xs text-red-500 mt-1">
              {{ errors.guest_email }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="lasttName"
              ><span class="text-gray-400">Bedding</span></label
            >
            <select
              v-model="selectedBedType"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
            >
              <option v-for="bed in bedType" :key="bed" :value="bed">
                {{ bed }}
              </option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label for="adult"
                ><span class="text-gray-400">Adult</span></label
              >
              <input
                id="adults"
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
                id="children"
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
              v-model="formData.notes"
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

          <!-- Dietary Restriction -->
          <div class="flex flex-col gap-2 w-full md:col-span-2">
            <label for="dietary"
              ><span class="text-gray-400">Dietary Restriction</span></label
            >
            <div class="flex gap-2 items-center">
              <UIToggle
                v-model="isHaveDietRestric"
                off-label="None"
                on-label="Yes"
              />
            </div>

            <textarea
              v-if="isHaveDietRestric"
              v-model="formData.dietary_restriction"
              maxlength="255"
              rows="3"
              class="mt-2 p-2 border rounded w-full bg-[#F5F5F5] outline-sarva-green"
              placeholder="Please specify your dietary restrictions (max 255 characters)"
            ></textarea>

            <!-- Optional character counter -->
            <div
              v-if="isHaveDietRestric"
              class="text-sm text-gray-400 text-right"
            >
              {{ formData.dietary_restriction?.length || 0 }}/255
            </div>
          </div>
        </div>

        <div class="p-4 md:p-10 bg-white grid md:grid-cols-2 gap-x-4 gap-y-6">
          <p class="font-bold text-lg md:text-xl mt-2 md:col-span-2">
            Contact Details
          </p>
          <div class="md:col-span-2 flex items-center gap-3">
            <button
              type="button"
              class="w-10 h-6 flex items-center rounded-full transition cursor-pointer"
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

          <div v-if="isBookingForOther" class="flex flex-col gap-2">
            <label for="phone"
              ><span class="text-red-500">*</span
              ><span class="text-gray-400">Phone Number</span></label
            >
            <div class="flex gap-2">
              <div class="relative country-dropdown">
                <button
                  type="button"
                  id="guest_other_phone_country"
                  class="bg-[#F5F5F5] py-2 px-3 outline-sarva-green w-28 flex items-center justify-between"
                  :class="
                    errors.guest_other_phone_country
                      ? 'border border-red-500'
                      : ''
                  "
                  @click="showOtherCountryDropdown = !showOtherCountryDropdown"
                >
                  <span
                    >{{ selectedOtherCountry?.flag }} +{{
                      formData.guest_other_phone_country
                    }}</span
                  >
                  <Icon name="mynaui:chevron-down" size="1.2rem" />
                </button>
                <div
                  v-if="showOtherCountryDropdown"
                  class="absolute z-50 top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto w-72"
                >
                  <button
                    v-for="item in countryCodes"
                    :key="item.code"
                    type="button"
                    class="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-3 text-left"
                    @click="selectOtherCountry(item.code)"
                  >
                    <span class="text-xl">{{ item.flag }}</span>
                    <span class="flex-1">{{ item.country }}</span>
                    <span class="text-gray-500">+{{ item.code }}</span>
                  </button>
                </div>
              </div>
              <input
                id="guest_other_phone"
                v-model="formData.guest_other_phone"
                type="tel"
                placeholder="Enter phone number"
                class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green flex-1"
                :class="errors.guest_other_phone ? 'border border-red-500' : ''"
                @input="
                  (e) => {
                    formData.guest_other_phone = (
                      e.target as HTMLInputElement
                    ).value.replace(/\D/g, '');
                    validateField('guest_other_phone');
                  }
                "
                @blur="validateField('guest_other_phone')"
              />
            </div>
            <p
              v-if="errors.guest_other_phone_country"
              class="text-xs text-red-500 mt-1"
            >
              {{ errors.guest_other_phone_country }}
            </p>
            <p
              v-if="errors.guest_other_phone"
              class="text-xs text-red-500 mt-1"
            >
              {{ errors.guest_other_phone }}
            </p>
          </div>

          <div v-if="isBookingForOther" class="flex flex-col gap-2">
            <label for="email"
              ><span class="text-red-500">*</span
              ><span class="text-gray-400">Email</span></label
            >
            <input
              id="guest_other_email"
              v-model="formData.guest_other_email"
              type="text"
              class="bg-[#F5F5F5] py-2 px-4 outline-sarva-green"
              :class="errors.guest_other_email ? 'border border-red-500' : ''"
              @input="validateField('guest_other_email')"
              @blur="validateField('guest_other_email')"
            />
            <p
              v-if="errors.guest_other_email"
              class="text-xs text-red-500 mt-1"
            >
              {{ errors.guest_other_email }}
            </p>
          </div>
        </div>

        <div class="p-4 md:p-10 bg-white">
          <p class="font-bold text-lg md:text-xl mt-2 md:col-span-2">
            Optional Extras
          </p>
          <ul class="w-full mt-6">
            <li
              v-for="item in extras"
              :key="item.id"
              class="flex justify-between w-full not-first:mt-10"
            >
              <div class="flex flex-col gap-2 relative">
                <div class="flex items-center gap-3">
                  <span
                    class="text-black"
                    :class="{
                      'text-sarva-green font-semibold':
                        addedExtra.includes(item),
                    }"
                    >{{ item.name }}</span
                  >
                  <div
                    v-if="addedExtra.includes(item)"
                    class="text-sarva-green"
                  >
                    <Icon name="mynaui:check-circle-one" />
                    <span class="hidden">Added</span>
                  </div>
                </div>
                <p class="text-sm text-gray-400 flex items-center gap-1">
                  More Info
                  <Icon
                    name="mynaui:arrow-up-right"
                    size="1rem"
                    class="mt-0.5"
                  />
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
                <button
                  v-else
                  @click="removeExtra(item.id)"
                  class="cursor-pointer flex items-center text-black/80"
                >
                  Remove <Icon name="mynaui:x" size="1.25rem" />
                </button>
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
                <td class="">
                  {{ qty }} Unit<span v-if="qty > 1">s</span>,
                  {{ nights }} Night<span v-if="nights > 1">s</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-6 pt-6 border-t border-white/50">
            <div class="flex justify-between">
              <span>Promo code</span>
            </div>
            <div
              v-if="voucherError"
              class="mt-2 text-sm bg-amber-100 text-amber-500 px-2 py-1"
            >
              {{ voucherError }}
            </div>
            <div class="mt-2 flex w-full">
              <input
                v-model="voucherCode"
                type="text"
                class="bg-white py-2 px-4 outline-sarva-green w-full text-primary"
                @keyup.enter="validateVoucher"
              />
              <button
                @click="validateVoucher"
                type="button"
                class="bg-primary px-4 cursor-pointer"
              >
                Apply
              </button>
            </div>
            <ul class="mt-8 flex flex-col gap-4">
              <li
                v-for="item in voucherApplied"
                :key="item.code"
                class="flex items-center justify-between"
              >
                <span class="uppercase">{{ item.code }}</span>
                <button
                  @click="removeVoucher(item.code)"
                  class="flex items-center gap-2 cursor-pointer text-white/80"
                >
                  Remove <Icon name="mynaui:x" size="1.25rem" />
                </button>
              </li>
            </ul>
          </div>
          <div class="mt-6 pt-6 border-t border-white/50">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>IDR{{ formatCurrency(subTotal) }}</span>
            </div>
            <div
              v-if="voucherApplied.length > 0"
              class="flex justify-between mt-4"
            >
              <span>Voucher Discount</span>
              <span>-IDR{{ formatCurrency(voucherDiscount) }}</span>
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
                >IDR{{
                  formatCurrency(
                    subTotal + subTotalExtra + tax - voucherDiscount,
                  )
                }}</span
              >
            </div>
          </div>
          <div
            v-if="bookingError"
            class="mt-6 bg-amber-100 text-amber-500 px-2 py-1"
          >
            {{ bookingError }}
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
                <span class="underline cursor-pointer"
                  >Terms and Conditions</span
                >
                |
                <span class="underline cursor-pointer">Payment Terms</span>
              </span>
            </label>
          </div>
          <button
            @click="booking"
            :disabled="isLoading"
            class="mt-8 font-bold bg-primary text-center text-xl hover:bg-primary-darker text-white px-6 py-3 cursor-pointer transition-all w-full disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {{ isLoading ? "Processing..." : "Pay Now" }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
