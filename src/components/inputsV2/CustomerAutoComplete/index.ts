export { default } from './CustomerAutoComplete';

export type ISingleApiResponse = {
  citizenNumber: string;
  firstName: string;
  id: number;
  lastName: string;
};
export type IApiResponse = ISingleApiResponse[];

export type IAutoCompleteOption = {
  value: string;
  key: number;
};

export type ICustomerAutoCompleteInputProps = {
  disabled?: boolean;
  onSelect: (value: ISingleApiResponse | null) => void;
};

export const parseApiResponseToAutoCompleteOptions = (input: IApiResponse) => {
  return input.map(({ firstName = null, lastName = null, citizenNumber = '', id }) => {
    if (lastName !== null && firstName !== null) {
      return {
        value: `${firstName} ${lastName} (CPF: ${citizenNumber})`,
        key: id,
      };
    } else {
      return {
        value: `${firstName || ''}${lastName || ''} (CI: ${citizenNumber})`,
        key: id,
      };
    }
  });
};
