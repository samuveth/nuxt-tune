<script setup lang="ts">
import { Float } from '@headlessui-float/vue'
import type { Placement } from '@floating-ui/dom'
import TuneButtonSelect from './TuneButtonSelect.vue'

withDefaults(
  defineProps<{
    label?: string
    placement?: Placement
    disabled?: boolean
    portal?: boolean
  }>(),
  {
    label: '',
    placement: 'bottom-end',
    disabled: false,
    portal: false
  }
)
</script>

<template>
  <HeadlessPopover as="div">
    <Float
      enter="transition ease-out duration-100"
      enter-from="transform opacity-0 scale-95"
      enter-to="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leave-from="transform opacity-100 scale-100"
      leave-to="transform opacity-0 scale-95"
      :placement="placement"
      :offset="4"
      :shift="16"
      :flip="16"
      :z-index="50"
      :portal="portal"
    >
      <HeadlessPopoverButton
        class="outline-none"
        :disabled="disabled"
      >
        <span
          v-if="$slots.button"
          :class="[{ 'cursor-not-allowed opacity-40': disabled }]"
        >
          <slot name="button" />
        </span>
        <TuneButtonSelect
          v-else
          :disabled="disabled"
        >
          <span>{{ label }}</span>
        </TuneButtonSelect>
      </HeadlessPopoverButton>

      <HeadlessPopoverPanel
        v-slot="{ close }"
        class="w-screen max-w-xs outline-none sm:max-w-sm"
      >
        <div class="tune-popover overflow-hidden">
          <div
            class="no-scrollbar max-h-[85vh] overflow-y-auto overscroll-contain text-base"
          >
            <slot
              name="content"
              :close="close"
            />
          </div>
        </div>
      </HeadlessPopoverPanel>
    </Float>
  </HeadlessPopover>
</template>
