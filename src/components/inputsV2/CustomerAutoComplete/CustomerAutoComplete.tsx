import React, { FC } from 'react';

import { AutoComplete, Input } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';

import {
  IApiResponse,
  parseApiResponseToAutoCompleteOptions,
  ICustomerAutoCompleteInputProps,
  IAutoCompleteOption,
  ISingleApiResponse,
} from '.';
import { useAxios } from '../../../hooks/useAxiosV2';

const CustomerAutoCompleteInput: FC<ICustomerAutoCompleteInputProps> = ({ onSelect, disabled }) => {
  const { axios } = useAxios();

  const apiResponseRef = React.useRef<IApiResponse>([]);

  const [selectedCustomer, setSelectedCustomer] = React.useState<ISingleApiResponse | null>(null);
  const [options, setOptions] = React.useState<IAutoCompleteOption[]>([]);

  const onSearch = React.useCallback(
    (searchStr: string) => {
      if (!searchStr) {
        setSelectedCustomer(null);
        return;
      }

      axios
        ?.post(
          `customers/find-by-name`,
          {},
          {
            params: {
              filters: {
                name: {
                  value: searchStr,
                  title: 'Customer Name',
                  filterType: 'Text',
                },
              },
            },
          },
        )
        .then(res => {
          apiResponseRef.current = res.data;
          setOptions(parseApiResponseToAutoCompleteOptions(res.data));
        })
        .catch(() => {
          setOptions([]);
          apiResponseRef.current = [];
        });
    },
    [axios],
  );

  const innerOnSelect = React.useCallback(
    (a: string, b: IAutoCompleteOption) => {
      const selectedOption = apiResponseRef.current.find(({ id }) => id === b.key);
      setSelectedCustomer(selectedOption || null);

      onSelect && onSelect(selectedOption || null);
    },
    [onSelect],
  );

  return (
    <AutoComplete
      options={options}
      onSelect={innerOnSelect}
      onSearch={onSearch}
      notFoundContent={<LoadingOutlined />}
      allowClear
      disabled={disabled}
    >
      <Input suffix={<SearchOutlined />} value={selectedCustomer?.citizenNumber} disabled={disabled} />
    </AutoComplete>
  );
};

export default CustomerAutoCompleteInput;
