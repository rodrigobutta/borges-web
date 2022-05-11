import { BaseModel } from './BaseModel';

export interface UploadDocument extends BaseModel {
  name: string;
  url: string;
}
