<script setup lang="ts">
import EmptyLayout from '@/layouts/empty-layout.vue';
import MainLayout from '@/layouts/main-layout.vue';
import { computed, reactive, shallowRef } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const layouts = reactive<{ [key: string]: any }>({
  main: shallowRef(MainLayout),
  empty: shallowRef(EmptyLayout)
});

const getLayout = computed(() => layouts[String(route.meta.layout)]);
</script>

<template>
  <component :is="getLayout">
    <router-view />
  </component>
</template>
