import { ValidationLib } from '../libs';

export const ACCOUNT_ADDRESS = ValidationLib.string().required();
export const ACCOUNT_BANKACCOUNTNUMBER = ValidationLib.number().max(9999999999).required();
export const ACCOUNT_BANKAGENCYNUMBER = ValidationLib.number().max(9999).required();
export const ACCOUNT_BANKDIGIT = ValidationLib.number().max(9).required();
export const ACCOUNT_BANKNAME = ValidationLib.string().max(60).required();
export const ACCOUNT_BANKNUMBER = ValidationLib.string().max(3).notRequired();
export const ACCOUNT_CITY = ValidationLib.string().required();
export const ACCOUNT_COMPANYIDNUMBER = ValidationLib.string().max(18).cnpjFormat().required();
export const ACCOUNT_EMAIL = ValidationLib.string().email().max(254).required();
export const ACCOUNT_NEIGHBORHOOD = ValidationLib.string().required();
export const ACCOUNT_POSTALCODE = ValidationLib.string().required();
export const ACCOUNT_STATE = ValidationLib.string().required();
export const ACCOUNT_STREETNUMBER = ValidationLib.number().required();
export const ACCOUNT_REPRESENTATIVE1 = ValidationLib.number().required();
export const ACCOUNT_REPRESENTATIVE2 = ValidationLib.number().required();
export const ACCOUNT_DEPOSITARY = ValidationLib.string().required();

export const CUSTOMER_CPF = ValidationLib.string().cpfFormat().required();
export const CUSTOMER_DECLAREDINCOME = ValidationLib.string().required();
export const CUSTOMER_FIRSTNAME = ValidationLib.string().required();
export const CUSTOMER_JOBTYPE = ValidationLib.string().required();
export const CUSTOMER_LASTNAME = ValidationLib.string().required();
export const CUSTOMER_PHONENUMBER = ValidationLib.string().max(15).required();
export const CUSTOMER_EMAIL = ValidationLib.string().email().required();
