<script setup lang="ts">
defineProps<{message:string}>()
</script>

<template>
  <div class="mb-4 p-3 bg-red-100 text-red-700 rounded">{{ message }}</div>

</template>

<style scoped>

</style>