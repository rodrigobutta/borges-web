import { BaseModel } from './BaseModel';
import { Customer } from './Customer';

export interface CustomerFulfillmentStatus extends BaseModel {
  code?: string;
  name?: string;
  customers?: Customer[];
}
