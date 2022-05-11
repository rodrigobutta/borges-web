import { BaseModel } from '../models/BaseModel';

export interface DocumentSignatureDTO extends BaseModel {
  res: string;
  document: any;
  sign: {
    id: number;
    signedAt: Date;
    url: string;
  };
}
