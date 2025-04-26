<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  disabled?: boolean
}>()
defineEmits<{(e:'update:modelValue',value:string):void}>()
</script>

<template>
<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">{{label}}</label>
  <input :disabled="disabled" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :value="modelValue" :placeholder="placeholder" type="text" @input="$emit('update:modelValue',($event.target as HTMLInputElement).value)">
</div>
</template>

<style scoped>

</style>