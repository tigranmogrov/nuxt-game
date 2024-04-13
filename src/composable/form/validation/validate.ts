import type { IErrorFields, IFormFields, IValidationRules } from '@/types';
import { reactive } from 'vue';

export default class FormValidator {
  private readonly formData: IFormFields;
  private readonly validationRules: IValidationRules;
  private errors: IErrorFields = reactive({});

  constructor(formData: IFormFields, validationRules: IValidationRules) {
    this.formData = formData;
    this.validationRules = validationRules;
  }

  private validateField(field: string) {
    const value = this.formData[field];
    const rules = this.validationRules[field] || [];
    for (const rule of rules) {
      const errorMessage = rule.validator(value, field);
      if (errorMessage) {
        this.errors[field] = errorMessage;
        return false;
      }
    }
    this.errors[field] = null;
    return true;
  }

  validateForm() {
    let formIsValid = true;
    for (const field of Object.keys(this.validationRules)) {
      if (!this.validateField(field)) {
        formIsValid = false;
      }
    }
    if (formIsValid) {
      return null;
    } else {
      return this.errors;
    }
  }

  getErrors() {
    return this.errors;
  }
}
