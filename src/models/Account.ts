import { BaseModel } from './BaseModel';

export interface Account extends BaseModel {
  name: string;
  legalName: string;
  companyIDNumber: string;
  address: string;
  streetNumber: number;
  city: string;
  state: string;
  comment: string;
  bankName: string;
  bankNumber: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankAgencyNumber: string;
  bankDigit: string;
  representative1: number;
  representative2: number;
  depositary: number;
  contactEmail: string;
  contactPhone: string;
  financialProviders: string[];
  infoComplete: boolean;
}
