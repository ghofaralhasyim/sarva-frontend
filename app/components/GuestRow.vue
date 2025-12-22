<script setup lang="ts">
interface Props {
  label: string;
  modelValue: number;
  min?: number;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const increase = (): void => {
  emit("update:modelValue", props.modelValue + 1);
};

const decrease = (): void => {
  emit("update:modelValue", Math.max(props.min, props.modelValue - 1));
};
</script>

<template>
  <div class="flex items-center justify-between">
    <span class="font-medium text-gray-800">{{ label }}</span>

    <div class="flex items-center gap-3">
      <button
        class="w-8 h-8 rounded-full border text-lg disabled:opacity-40"
        :disabled="modelValue <= min"
        @click="decrease"
      >
        −
      </button>

      <span class="w-6 text-center">{{ modelValue }}</span>

      <button class="w-8 h-8 rounded-full border text-lg" @click="increase">
        +
      </button>
    </div>
  </div>
</template>
