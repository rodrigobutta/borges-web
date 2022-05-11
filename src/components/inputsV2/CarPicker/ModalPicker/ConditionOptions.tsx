import React, { FC } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { useAxios } from 'hooks/useAxiosV2';

interface IConditionOptionsProps {
  onItemSelect: (condition: { id: string; name: string }) => void;
}

const ConditionOptions: FC<IConditionOptionsProps> = ({ onItemSelect }) => {
  const { axios, axiosInitialized } = useAxios({ apiVersion: 1 });

  const [conditions, setConditions] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!axiosInitialized) return;

    axios?.get(`dealers/vehicles/conditions`).then(res => {
      setConditions(res.data);
    });
  }, [axios, axiosInitialized]);

  if (!conditions || conditions.length === 0) {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />;
  }

  return (
    <>
      {conditions.map(x => (
        <div key={x.id} onClick={() => onItemSelect(x)} className='car-picker-option'>
          {x.name}
        </div>
      ))}
    </>
  );
};

export default React.memo(ConditionOptions);
