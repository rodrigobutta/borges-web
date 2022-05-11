import { BaseModel } from './BaseModel';
import { CustomerFulfillmentStatus } from './CustomerFulfillmentStatus';

export interface Customer extends BaseModel {
  citizenNumber?: string; // ex cpf
  firstName?: string;
  lastName?: string;
  cnpj?: string;
  cpf?: string;
  email?: string;
  phoneNumber?: string;
  jobType?: string;
  idFrontImage?: any;
  idBackImage?: any;
  addressCertificate?: any;
  incomeCertificate?: any;
  auxiliaryDocument1?: any;
  auxiliaryDocument2?: any;
  estimatedIncome?: number;
  declaredIncome?: number;

  fulfillmentStatus: CustomerFulfillmentStatus;
}
