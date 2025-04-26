<script setup lang="ts">
defineProps<{
  content: string
  notFullWidth?: boolean
}>()

</script>

<template>
  <button :class="[notFullWidth?'':'w-full','py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors']"
  >{{ content }}
  </button>
</template>

<style scoped>

</style>