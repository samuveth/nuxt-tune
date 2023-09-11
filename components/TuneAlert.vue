<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'negative' | 'positive'
  }>(),
  {
    variant: 'default'
  }
)

const iconName = computed(() => {
  if (props.variant === 'default') return 'heroicons-outline:exclamation-circle'
  if (props.variant === 'negative') return 'heroicons-outline:exclamation'
  return 'heroicons-outline:sparkles'
})
</script>

<template>
  <div
    class="tune-alert flex"
    :class="[
      { 'alert-negative': variant === 'negative' },
      { 'alert-positive': variant === 'positive' }
    ]"
  >
    <div
      class="tune-alert-icon flex items-center"
      :class="[
        { 'alert-negative': variant === 'negative' },
        { 'alert-positive': variant === 'positive' }
      ]"
    ></div>
    <div class="tune-alert-text">
      <slot />
    </div>
  </div>
</template>
