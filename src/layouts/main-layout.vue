<script setup lang="ts">
import AppHeader from '@/components/app-header.vue';
</script>

<template>
  <app-header />
  <main class="main">
    <slot />
  </main>
</template>

<style scoped></style>
