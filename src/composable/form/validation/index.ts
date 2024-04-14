import type { IErrorFields, IFormFields, IValidationRules } from '@/types';
import { reactive } from 'vue';

export * from './regexp';
export * from './validationRules';

export default class FormValidator {
  private readonly formData: IFormFields;
  private readonly validationRules: IValidationRules;
  private errors = reactive<IErrorFields>({});

  constructor(formData: IFormFields, validationRules: IValidationRules) {
    this.formData = formData;
    this.validationRules = validationRules;
  }

  private validateField(field: string): boolean {
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

  validateForm(): IErrorFields | null {
    let formIsValid = true;
    for (const field of Object.keys(this.validationRules)) {
      if (!this.validateField(field)) {
        formIsValid = false;
      }
    }
    return formIsValid ? null : this.errors;
  }

  getErrors(): IErrorFields {
    return this.errors;
  }
}
