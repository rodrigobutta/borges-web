export { default } from './FormikFieldWrapper';

// Typing

export type ICommonFieldWrapper = {
  label: string;
  labelAlign?: 'left' | 'right';
  name: string;
  error?: any;
  touched?: any;
  disabled?: boolean;
  spanProportion?: [number, number];
};

export type ITextFieldWrapper = {
  type: 'text';
} & ICommonFieldWrapper;

export type INumberFieldWrapper = {
  type: 'number';
} & ICommonFieldWrapper;

export type IEmailFieldWrapper = {
  type: 'email';
} & ICommonFieldWrapper;

export type ISelectFieldWrapper = {
  type: 'select';
  options: {
    value: string | number;
    text: string;
  }[];
} & ICommonFieldWrapper;

export type ICellphoneFieldWrapper = {
  type: 'cellphone';
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
} & ICommonFieldWrapper;

export type IUserSelectFieldWrapper = {
  type: 'user-select';
} & ICommonFieldWrapper;

// TODO Remove updateFunction and handleChange.

export type IStateSelectFieldWrapper = {
  type: 'state-select';
} & ICommonFieldWrapper;

export type IFormikFieldWrapper =
  | ITextFieldWrapper
  | INumberFieldWrapper
  | IEmailFieldWrapper
  | ISelectFieldWrapper
  | ICellphoneFieldWrapper
  | IUserSelectFieldWrapper
  | IStateSelectFieldWrapper;

// Constants

export const defaultSpanProportion: [number, number] = [8, 16];
export const defaultLabelAlign = 'right';
export const cpfMaxLength = 11;

// Util functions

export const parseFieldsToFormikInitialValues = (fields: IFormikFieldWrapper[], defaultData?: any) => {
  defaultData = defaultData || {};

  const output: { [key: string]: any } = {};

  for (let i = 0; i < fields.length; i++) {
    const singleField = fields[i];

    output[singleField.name] = defaultData[singleField.name] || '';
  }

  return output;
};

export const getIsInvalidClassName = (error: string, touched: boolean) => {
  if (error && touched) return 'is-invalid';

  return '';
};
