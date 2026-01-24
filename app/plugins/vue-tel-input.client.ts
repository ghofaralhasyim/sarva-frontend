import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelInput, {
    mode: "international",
    defaultCountry: "ID",
    autoFormat: true,
    dropdownOptions: {
      showSearchBox: true,
      showFlags: true,
    },
    inputOptions: {
      placeholder: "Enter phone number",
    },
  });
});
