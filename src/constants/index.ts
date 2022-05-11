export const carTypeOptions = [
  { id: 'Hatch', name: 'Hatch' },
  { id: 'Sedan', name: 'Sedan' },
  { id: 'SUV', name: 'SUV' },
  { id: 'Outro', name: 'Outro' },
  { id: 'Pick-Up', name: 'Pick-Up' },
];

export const INVENTORY_TYPE = {
  'simulation': 5,
  'dealer-stock': 10,
  'dealer-virtual': 15,
  'private-stock': 20,
  'private-virtual': 25,
  'external-mercadolibre': 30,
};

export const VEHICLE_STATUS = [
  { id: 'excellent', name: 'Excelente' },
  { id: 'very-good', name: 'Muito bem' },
  { id: 'good', name: 'Bem' },
];

export enum CIVIL_STATUS {
  MARRIED = 'married',
  SINGLE = 'single',
  DIVORCED = 'divorced',
  WINDOWER = 'widower',
}

export const VEHICLE_GENERAL_CONDITIONS = [
  { id: 5, name: 'Malo' },
  { id: 10, name: 'Regular' },
  { id: 15, name: 'Bueno' },
  { id: 20, name: 'Excelente' },
];

export const civilStatusList = [
  { id: CIVIL_STATUS.MARRIED, name: 'Casado' },
  { id: CIVIL_STATUS.SINGLE, name: 'Solteiro' },
  { id: CIVIL_STATUS.DIVORCED, name: 'Divorciado' },
  { id: CIVIL_STATUS.WINDOWER, name: 'Viúvo' },
];

export const genderList = [
  { id: 'male', name: 'Masculino' },
  { id: 'female', name: 'Feminino' },
  { id: 'other', name: 'Outro' },
];

export const educationLevelList = [
  { id: 'primary', name: 'Primário' },
  { id: 'secondary', name: 'Secundário' },
  { id: 'tertiary', name: 'Terciário' },
];

export const homeTypeList = [
  { id: 'own', name: 'Própria' },
  { id: 'rent', name: 'Alugada' },
  // { id: "other", name: "Outro" },
];

export const FETCH_SUCCESS_USER = 'FETCH_SUCCESS_USER';
export const FETCH_ERROR_USER = 'FETCH_ERROR_USER';
export const FIELD_TYPES = {
  CAR_PICKER: 'carPicker',
  CHECKBOX: 'checkbox',
  CURRENCY: 'currency',
  DATE: 'date',
  DATE_TIME: 'date_time',
  DATE_TIME_MED: 'date_time_med',
  EMAIL: 'email',
  PHONE: 'phone',
  CITIZEN_NUMBER: 'cpf',
  INTEGER: 'integer',
  NUMBER: 'number',
  PASSWORD: 'password',
  PERCENTAGE: 'percentage',
  RADIO_BUTTON: 'radioButton',
  RELATIVE_TIME: 'relative_time',
  JSON: 'json',
  SELECT: 'select',
  TEXT: 'text',
  QUOTE_STATUS: 'quoteStatus',
  QUOTE_STATUS_REASON: 'quoteStatusReason',
  RISK_RESULT: 'riskResult',
  RISK_PROVIDER_RESULT: 'riskProviderResult',
  RISK_PROVIDER_BSMART_EXPLANATION: 'riskProviderBSmartExplanation',
};

export const NO_AUTH_ROUTES = ['/register'];

export const paths = {
  login: '/login',
  recovery: '/recovery',
};
export const pageSize = 50;

export const jobTypes = [
  { code: 1, description: 'Assalariado' },
  {
    code: 2,
    description: 'Aposentado',
  },
  { code: 3, description: 'Autônomo' },
  { code: 4, description: 'Trabalhador informal' },
  {
    code: 5,
    description: 'Trabalhador informal Autônomo',
  },
];

export const DEALER_COMMISSION_TABLE = [
  { id: 1, code: 'r0', name: 'R0' },
  { id: 2, code: 'r1', name: 'R1' },
  { id: 3, code: 'r2', name: 'R2' },
  { id: 4, code: 'r3', name: 'R3' },
  { id: 5, code: 'r4', name: 'R4' },
  { id: 6, code: 'r5', name: 'R5' },
];
export const getJobType = (id: any) => jobTypes.find(j => j.code === id);

export const getDealerCommissionById = (id: number) => DEALER_COMMISSION_TABLE.find(j => j.id === id);

export const scoreColorList: any = {
  A: '#46d40a',
  B: '#5ab134',
  C: '#cf8a08',
  D: '#634102',
  F: '#920904',
};

export const ALLOWED_ROLES = ['aracar_dealer', 'aracar_dealer_admin'];

export const ITEMS_PER_PAGE = 10;

export const CONSUMER_ACCOUNT_ID = 1;
export const PANEL_ACCOUNT_ID = 2;

export const CONTACT_CHANNEL = [
  {
    id: 10,
    code: 'visit',
    name: 'Visita a loja',
  },
  {
    id: 20,
    code: 'call',
    name: 'Telefone',
  },
  {
    id: 30,
    code: 'email',
    name: 'E-mail',
  },
  {
    id: 40,
    code: 'whatsapp',
    name: 'Whatsapp',
  },
  {
    id: 50,
    code: 'facebook',
    name: 'Mídias Sociais',
  },
  {
    id: 60,
    code: 'ticket',
    name: 'Indicação',
  },
];

export const TYPE_COLORS: any = {
  success: '#5ab134',
  info: '#1890ff',
  warn: '#ffa500',
  error: '#ff4d4f',
};
