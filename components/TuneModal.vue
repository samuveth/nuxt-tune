<script setup lang="ts">
import IconXMark from '~icons/heroicons-outline/x-mark'
import TuneButton from './TuneButton.vue'

withDefaults(
  defineProps<{
    open: boolean
    title: string
    footerButtons?: 'none' | 'confirm' | 'confirmAndCancel'
  }>(),
  {
    footerButtons: 'none'
  }
)

defineEmits(['close', 'confirm', 'cancel'])
</script>

<template>
  <HeadlessTransitionRoot
    appear
    :show="open"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-10"
      @close="$emit('close')"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="tune-modal-backdrop fixed inset-0" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="tune-modal-panel w-full transform overflow-hidden align-middle transition-all"
            >
              <div class="absolute right-4 top-4">
                <span tabindex="0"></span>
                <button @click="$emit('close')">
                  <span class="sr-only">Close</span>
                  <IconXMark
                    class="text-sm"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <HeadlessDialogTitle
                as="h3"
                class="tune-modal-title"
              >
                {{ title }}
              </HeadlessDialogTitle>
              <div class="tune-modal-content">
                <slot />
              </div>

              <div
                v-if="$slots.footer || footerButtons !== 'none'"
                class="tune-modal-footer"
              >
                <slot
                  v-if="$slots.footer"
                  name="footer"
                />
                <template v-else>
                  <TuneButton
                    v-if="footerButtons === 'confirmAndCancel'"
                    class="w-full"
                    variant="outlined"
                    @click="$emit('cancel')"
                  >
                    Cancel
                  </TuneButton>
                  <TuneButton
                    v-if="
                      footerButtons === 'confirm' ||
                      footerButtons === 'confirmAndCancel'
                    "
                    class="w-full"
                    @click="$emit('confirm')"
                  >
                    Confirm
                  </TuneButton>
                </template>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>
