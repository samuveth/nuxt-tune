<script setup lang="ts">
import TuneButton from './TuneButton.vue'

withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    tooltip?: string | null
    block?: boolean
    open?: boolean
    showChevron?: boolean
  }>(),
  {
    label: 'Select',
    disabled: false,
    tooltip: null,
    block: false,
    open: false,
    showChevron: true
  }
)

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<template>
  <div :class="[{ 'w-full': block }]">
    <TuneButton
      v-tippy="{ content: tooltip }"
      variant="outlined"
      :class="[
        $attrs.class,
        { 'disabled cursor-not-allowed': disabled },
        { 'w-full': block }
      ]"
      class="tune-button-select"
      :disabled="disabled"
      @click="emit('select')"
    >
      <span class="flex items-center gap-1 truncate">
        <slot />
      </span>
      <Icon
        v-if="showChevron"
        name="heroicons-outline:chevron-down"
        class="tune-input-chevron -mr-1 shrink-0 text-sm"
        :class="{ 'tune-input-chevron-up rotate-180': open }"
      />
    </TuneButton>
  </div>
</template>
