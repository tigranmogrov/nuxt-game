<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { getUser: user } = storeToRefs(userStore);
</script>

<template>
  <dl v-if="user" class="user-info">
    <dt class="user-info__term">Name</dt>
    <dd class="user-info__desc">{{ user.name }}</dd>
    <dt class="user-info__term">Email</dt>
    <dd class="user-info__desc">
      <a :href="'mailto:' + user.email">{{ user.email }}</a>
    </dd>
    <dt class="user-info__term">Address</dt>
    <dd class="user-info__desc">{{ user.address.city }}, {{ user.address.street }}</dd>
    <dt class="user-info__term">Phone</dt>
    <dd class="user-info__desc">
      <a :href="'tel:' + user.phone">{{ user.phone }}</a>
    </dd>
    <dt class="user-info__term">Website</dt>
    <dd class="user-info__desc">
      <a :href="user.website">{{ user.website }}</a>
    </dd>
    <dt class="user-info__term">Company</dt>
    <dd class="user-info__desc">{{ user.company.name }}</dd>
  </dl>
</template>

<style scoped></style>
