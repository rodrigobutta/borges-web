import { Account } from './Account';
import { BaseModel } from './BaseModel';
import { Customer } from './Customer';

export interface Profile extends BaseModel {
  uuid?: string;
  email?: string;
  customerId?: number;
  accountId?: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  authClientName?: string;
  locale?: string;
  customer?: Customer;
  account?: Account;
}
