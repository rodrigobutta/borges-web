import { ValidationLib } from 'libs';

import { IFormikFieldWrapper } from 'utils/react-related';

import * as ValidationRules from 'utils/validationRules';

export { default } from './PreferencesGeneral';

export const formikFields: IFormikFieldWrapper[] = [
  {
    name: 'salesPersonAracar',
    type: 'text',
    label: 'Consultor',
    disabled: true,
  },
  { name: 'name', type: 'text', label: 'Nome', disabled: true },
  { name: 'companyIDNumber', type: 'text', label: '* CNPJ' },
  { name: 'legalName', type: 'text', label: '* Razão Social' },
  { name: 'email', type: 'email', label: '* Email da empresa' },
  { name: 'address', type: 'text', label: '* Rua/Avenida' },
  { name: 'streetNumber', type: 'number', label: '* Número' },
  { name: 'comment', type: 'text', label: 'Complemento' },
  { name: 'postalCode', type: 'text', label: '* CEP' },
  { name: 'neighborhood', type: 'text', label: '* Bairro' },
  { name: 'city', type: 'text', label: '* Cidade' },
  { name: 'state', type: 'state-select', label: '* Estado' },
];

export const CARD_TITLE = 'Informação Geral';

export const FORMIK_FIELD_SPAN_PROPORTION: [number, number] = [24, 24];
export const FORMIK_FIELD_LABEL_ALIGN = 'left';

export const PROPERTY_DELETED_ON_SUBMIT = 'salesPersonAracar';

export const formikValidationSchema = ValidationLib.object().shape({
  address: ValidationRules.ACCOUNT_ADDRESS,
  city: ValidationRules.ACCOUNT_CITY,
  companyIDNumber: ValidationRules.ACCOUNT_COMPANYIDNUMBER,
  email: ValidationRules.ACCOUNT_EMAIL,
  neighborhood: ValidationRules.ACCOUNT_NEIGHBORHOOD,
  postalCode: ValidationRules.ACCOUNT_POSTALCODE,
  state: ValidationRules.ACCOUNT_STATE,
  streetNumber: ValidationRules.ACCOUNT_STREETNUMBER,
  representative1: ValidationRules.ACCOUNT_REPRESENTATIVE1,
  representative2: ValidationRules.ACCOUNT_REPRESENTATIVE2,
  depositary: ValidationRules.ACCOUNT_DEPOSITARY,
});

export const buildGetAccountEndpoint = (accountId: string) => `accounts/${accountId}`;
export const buildPatchAccountEndpoint = (accountId: string) => `accounts/${accountId}`;
