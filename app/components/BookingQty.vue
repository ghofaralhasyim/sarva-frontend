<script setup lang="ts">
interface Props {
  modelValue: number;
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const increase = (): void => {
  if (props.modelValue == props.max) return;
  emit("update:modelValue", props.modelValue + 1);
};

const decrease = (): void => {
  emit("update:modelValue", Math.max(props.min, props.modelValue - 1));
};
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <span class="font-medium text-gray-400">Unit</span>

    <div class="flex items-center gap-3">
      <button
        class="w-8 h-8 text-lg disabled:opacity-40 cursor-pointer"
        :disabled="modelValue <= min"
        @click="decrease"
      >
        −
      </button>

      <span class="w-6 text-center">{{ modelValue }}</span>

      <button class="w-8 h-8 text-lg cursor-pointer" @click="increase">
        +
      </button>
    </div>
  </div>
</template>
