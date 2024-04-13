import { regexp } from '@/composable/form/validation/regexp';
import type { IValidationRules, ValidatorReturnType } from '@/types';

const requiredValidator = (value: string, field: string): ValidatorReturnType => {
  if (!value) {
    return `${field} is required`;
  }
  return null;
};
const userNameValidator = (value: string, field: string): ValidatorReturnType => {
  if (!regexp.letters.test(value)) {
    return `${field} must only have letters`;
  }
  return null;
};
const phoneValidator = (value: string, field: string): ValidatorReturnType => {
  if (!regexp.phone.test(value)) {
    return `${field} should only have numbers and symbols`;
  }
  return null;
};
const numberValidator = (value: string, field: string): ValidatorReturnType => {
  if (!regexp.number.test(value)) {
    return `${field} should only have numbers`;
  }
  return null;
};

export const loginRules: IValidationRules = {
  userName: [{ validator: requiredValidator }, { validator: userNameValidator }],
  phoneNumber: [{ validator: requiredValidator }, { validator: phoneValidator }]
};

export const todoCreateRules: IValidationRules = {
  userId: [{ validator: requiredValidator }, { validator: numberValidator }],
  title: [{ validator: requiredValidator }]
};
