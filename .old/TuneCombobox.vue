<script setup lang="ts">
import { ref, computed } from 'vue'
import MiniSearch from 'minisearch'
import TuneLabelInput from './TuneLabelInput.vue'
import TuneErrorInput from './TuneErrorInput.vue'

import IconCheck from '~icons/heroicons-outline/check'

type ComboboxItem = {
  id: string
  name: string
  extras?: Record<string, any>
}

const props = defineProps<{
  modelValue: string
  items: ComboboxItem[]
  label: string
  hint?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])

const miniSearch = new MiniSearch({
  fields: ['id', 'name'],
  storeFields: ['id'],
  searchOptions: {
    boost: { name: 2 },
    fuzzy: 0.6
  }
})

miniSearch.addAll(props.items)

const searchInput = ref('')
const selectedItem = computed({
  get: () => props.items.find(item => item.id === props.modelValue) || null,
  set: newVal =>
    newVal
      ? emit('update:modelValue', newVal.id)
      : emit('update:modelValue', '')
})

const filteredItems = computed(() => {
  if (searchInput.value === '') {
    return props.items
  }

  const miniSearchIds = miniSearch.search(searchInput.value).map(i => i.id)

  const includesIds = props.items
    ?.filter(i =>
      i.name.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    .map(i => i.id)

  const filterIds = [...miniSearchIds, ...includesIds]

  const filteredItems = props.items.filter(item => {
    return filterIds.includes(item.id)
  })

  return filteredItems
})

const showErrorMessage = ref(false)

function forceShowError() {
  showErrorMessage.value = true
}

defineExpose({
  forceShowError
})

const isDisabled = computed(() => ({
  'pointer-events-none opacity-40': props.disabled
}))
</script>

<template>
  <div>
    <HeadlessCombobox
      v-model="selectedItem"
      :disabled="disabled"
      as="div"
      class="w-full"
      nullable
    >
      <div class="relative">
        <HeadlessComboboxButton
          class="tune-input-wrapper w-full"
          :class="[
            { 'cursor-not-allowed': disabled },
            {
              error: showErrorMessage && error
            }
          ]"
        >
          <HeadlessComboboxLabel :class="isDisabled">
            <TuneLabelInput
              :label="label"
              :hint="hint"
              :error="!!error && showErrorMessage"
            />
          </HeadlessComboboxLabel>
          <HeadlessComboboxInput
            class="tune-input placeholder:tune-placeholder w-full !pr-[30px]"
            spellcheck="false"
            :display-value="(item: any) => item?.name"
            :class="isDisabled"
            :disabled="disabled"
            :placeholder="placeholder || 'Select option'"
            @change="searchInput = $event.target.value"
          />
        </HeadlessComboboxButton>
        <HeadlessComboboxButton
          v-slot="{ open }"
          class="absolute inset-y-[12px] right-[12px] flex items-end px-2 focus:outline-none"
          :class="isDisabled"
        >
          <Icon
            name="heroicons-outline:chevron-down"
            :class="[
              'tune-input-chevron text-base',
              { 'tune-input-chevron-up rotate-180': open }
            ]"
          />
        </HeadlessComboboxButton>
        <HeadlessComboboxOptions
          v-if="filteredItems.length > 0"
          class="tune-list absolute z-40 mt-1 w-full overflow-hidden focus:outline-none"
        >
          <div class="max-h-[180px] overflow-y-auto">
            <HeadlessComboboxOption
              v-for="item in filteredItems"
              v-slot="{ active, selected, disabled: itemDisabled }"
              :key="item.id"
              as="template"
              :value="item"
            >
              <li
                :class="[
                  { active: active && !itemDisabled },
                  'tune-list-item relative cursor-default select-none truncate !pr-[50px]'
                ]"
              >
                <span
                  :class="[{ 'opacity-40': itemDisabled }, 'block truncate']"
                >
                  <slot
                    v-if="$slots.item"
                    name="item"
                    :item="item"
                  />
                  <span v-else>
                    {{ item.name }}
                  </span>
                </span>

                <span
                  v-if="selected"
                  :class="['absolute inset-y-0 right-0 flex items-center pr-3']"
                >
                  <IconCheck class="tune-list-check text-base" />
                </span>
              </li>
            </HeadlessComboboxOption>
          </div>
        </HeadlessComboboxOptions>
      </div>
    </HeadlessCombobox>
    <TuneErrorInput
      v-if="error && showErrorMessage"
      :error="error"
    />
  </div>
</template>
