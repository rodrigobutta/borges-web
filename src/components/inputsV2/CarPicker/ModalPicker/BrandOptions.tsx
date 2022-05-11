import React, { FC } from 'react';

import { Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useAxios } from 'hooks/useAxiosV2';

import { HighlightedTextPartial } from 'partials';

import { textFilter } from 'utils';

interface IBrandOptionsProps {
  onItemSelect: (brand: { id: string; name: string }) => void;
  newCar: boolean;
}

const BrandOptions: FC<IBrandOptionsProps> = ({ onItemSelect, newCar }) => {
  const { axios, axiosInitialized } = useAxios({ apiVersion: 1 });

  const [brands, setBrands] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (!axiosInitialized) return;

    axios
      ?.get(`dealers/vehicles/brands`, {
        params: {
          newCar,
        },
      })
      .then(res => {
        setBrands(res.data);
      });
  }, [axios, axiosInitialized, newCar]);

  if (!brands || brands.length === 0) {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />;
  }

  return (
    <div>
      <Input
        value={search}
        allowClear
        autoFocus
        onChange={e => setSearch(e.target.value)}
        placeholder='Filtrar resultados'
        className='car-picker__filter'
      />

      {textFilter(search, brands || [], ['name']).map((x: any) => (
        <div key={x.id} onClick={() => onItemSelect(x)} className='car-picker-option'>
          <HighlightedTextPartial needle={search} haystack={x.name} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(BrandOptions);
