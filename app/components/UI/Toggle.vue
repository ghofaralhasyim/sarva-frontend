<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    disabled?: boolean;
    size?: "sm" | "md";
    onLabel?: string;
    offLabel?: string;
  }>(),
  {
    size: "md",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
};

const sizes = {
  sm: {
    track: "w-9 h-5",
    thumb: "w-4 h-4",
    translate: "translate-x-4",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-5 h-5",
    translate: "translate-x-5",
  },
};
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
    class="relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
    :class="[
      sizes[size].track,
      modelValue ? 'bg-sarva-green' : 'bg-slate-300',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <span
      class="inline-block rounded-full bg-white shadow transition-transform duration-200"
      :class="[
        sizes[size].thumb,
        modelValue ? sizes[size].translate : 'translate-x-0.5',
      ]"
    />
  </button>

  <!-- Optional labels -->
  <span v-if="onLabel || offLabel" class="ml-2 text-sm select-none">
    {{ modelValue ? onLabel : offLabel }}
  </span>
</template>
