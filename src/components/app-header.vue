<script setup lang="ts">
import IIconExit from '@/components/icons/i-icon-exit.vue';
import IButton from '@/components/ui/i-button.vue';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'vue-router';

const { logoutUser } = useUserStore();
const router = useRouter();
const logout = () => {
  logoutUser();
  router.push({ name: 'login' });
};
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__info"></div>
      <i-button @click="logout">
        Exit
        <i-icon-exit />
      </i-button>
    </div>
  </header>
</template>

<style scoped></style>
