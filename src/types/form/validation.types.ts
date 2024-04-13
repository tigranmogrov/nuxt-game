export type ValidatorReturnType = string | null;
export interface IValidator {
  validator: (value: string, field: string) => ValidatorReturnType;
}
export interface IValidationRules {
  [key: string]: IValidator[];
}

export interface IFormFields {
  [key: string]: any;
}
export interface IErrorFields {
  [key: string]: string | null;
}
