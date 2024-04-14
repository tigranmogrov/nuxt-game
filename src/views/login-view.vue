<script setup lang="ts">
import IInput from '@/components/ui/I-input.vue';
import IButton from '@/components/ui/i-button.vue';
import FormValidator, { loginRules } from '@/composable/form/validation';
import { useUserStore } from '@/stores/user.store';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

// 'Kamren', '(254)954-1289'
const router = useRouter();
const userStore = useUserStore();

const isDisabled = ref(false);
const formData = reactive({
  userName: '',
  phoneNumber: ''
});

const formValidator = new FormValidator(formData, loginRules);
const fieldErrors = formValidator.getErrors();

const submitForm = async () => {
  const errors = formValidator.validateForm();
  if (!errors) {
    isDisabled.value = true;
    try {
      await userStore.loginUser(formData.userName, formData.phoneNumber);
      await router.push({ name: 'home' });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      isDisabled.value = false;
    }
  }
};
</script>

<template>
  <div class="container">
    <form
      :class="userStore.error ? 'login-form--error' : null"
      class="form login-form"
      novalidate
      @submit.prevent="submitForm"
    >
      <div class="login-form__head">
        <h2 class="login-form__title">
          <template v-if="!userStore.error"> Please Login</template>
          <span v-else class="login-form__error"> {{ userStore.error }}</span>
        </h2>
      </div>
      <div class="login-form__body">
        <i-input
          v-model="formData.userName"
          name="user-name"
          :class="fieldErrors['userName'] ? 'field-error' : null"
          label="Name"
          placeholder="Username"
        />
        <i-input
          v-model="formData.phoneNumber"
          name="phone"
          :class="fieldErrors['phoneNumber'] ? 'field-error' : null"
          type="tel"
          label="Phone"
          placeholder="Phone Number"
        />
        <i-button :disabled="isDisabled" type="submit">Register</i-button>
      </div>
      {{ userStore.user }}
    </form>
  </div>
</template>
