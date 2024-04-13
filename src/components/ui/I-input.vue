<script setup lang="ts">
export interface IFormField {
  id?: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
}

const model = defineModel<string>();

const { id, name } = withDefaults(defineProps<IFormField>(), {
  id: 'form-field',
  type: 'text',
  placeholder: 'Type text',
  label: ''
});

const fieldId = `${id}-${name}`;
</script>

<template>
  <div class="form-field">
    <label v-if="label?.trim()" :for="fieldId" class="form-label">{{ label }}</label>
    <input
      :id="fieldId"
      v-model.trim="model"
      :name="name"
      class="form-input"
      :placeholder="placeholder"
      :type="type"
    />
  </div>
</template>
