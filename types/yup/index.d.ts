import { StringSchema } from "yup";

declare module "yup" {
  interface StringSchema {
    cnpjFormat(): StringSchema;
    cpfFormat(): StringSchema;    
  }
  interface NumberSchema {
    lowerThanCurrentYear(): NumberSchema;
  }
}
