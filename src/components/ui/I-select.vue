<script setup lang="ts">
import type { ISelectStatusOptions } from '@/types';

export interface IFormSelect {
  id?: string;
  label?: string;
  name: string;
  options: ISelectStatusOptions[];
}

const model = defineModel<string>();

const { name, id } = withDefaults(defineProps<IFormSelect>(), {
  id: 'form-field',
  label: ''
});

const fieldId = `${id}-${name}`;
</script>

<template>
  <div class="form-field">
    <label v-if="label?.trim()" :for="fieldId" class="form-label">{{ label }}</label>
    <select :id="fieldId" v-model="model" :name="name" class="form-select">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
