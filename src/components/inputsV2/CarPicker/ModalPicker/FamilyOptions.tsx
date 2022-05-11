import React, { FC } from 'react';

import { Input } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import { useAxios } from 'hooks/useAxiosV2';

import { HighlightedTextPartial } from 'partials';

import { textFilter } from 'utils';

interface IFamilyOptionsProps {
  onItemSelect: (family: { id: string; name: string }) => void;
  brandId: string;
  newCar: boolean;
  year: string;
}

const FamilyOptions: FC<IFamilyOptionsProps> = ({ onItemSelect, newCar, brandId, year }) => {
  const { axios, axiosInitialized } = useAxios({ apiVersion: 1 });

  const [families, setFamilies] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (!axiosInitialized) return;

    axios
      ?.get(`dealers/vehicles/families`, {
        params: {
          brandId: brandId,
          newCar,
          year,
        },
      })
      .then(res => {
        setFamilies(res.data);
      });
  }, [axios, axiosInitialized, newCar, brandId, year]);

  if (!families || families.length === 0) {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />;
  }

  return (
    <div>
      <Input
        value={search}
        allowClear
        autoFocus
        onChange={e => setSearch(e.target.value)}
        placeholder={'Filtrar resultados'}
        className='car-picker__filter'
      />

      {textFilter(search, families || [], ['name']).map((x: any) => (
        <div key={x.id} onClick={() => onItemSelect(x)} className='car-picker-option'>
          <HighlightedTextPartial needle={search} haystack={x.name} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(FamilyOptions);
