import React, { FC } from 'react';

import { Input } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import { textFilter } from 'utils';

import { useAxios } from 'hooks/useAxiosV2';

import { HighlightedTextPartial } from 'partials';

interface IModelOptionsProps {
  onItemSelect: (model: { id: string; name: string }) => void;
  brandId: string;
  newCar: boolean;
  year: string;
  familyId: string;
}

const ModelOptions: FC<IModelOptionsProps> = ({ onItemSelect, newCar, brandId, year, familyId }) => {
  const { axios, axiosInitialized } = useAxios({ apiVersion: 1 });

  const [models, setModels] = React.useState<any[]>([]);

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (!axiosInitialized) return;

    axios
      ?.get(`dealers/vehicles/models`, {
        params: {
          newCar,
          brandId: brandId,
          year,
          familyId: familyId,
        },
      })
      .then(res => {
        setModels(res.data);
      });
  }, [axios, axiosInitialized, newCar, brandId, year, familyId]);

  if (!models || models.length === 0) {
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

      {textFilter(search, models || [], ['name']).map((x: any) => (
        <div key={x.id} onClick={() => onItemSelect(x)} className={'car-picker-option'}>
          <HighlightedTextPartial needle={search} haystack={x.name} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(ModelOptions);
