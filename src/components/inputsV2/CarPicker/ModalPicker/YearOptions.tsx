import React, { FC } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { useAxios } from 'hooks/useAxiosV2';

interface IYearOptionsProps {
  onItemSelect: (year: string) => void;
  brandId: string;
}

const YearOptions: FC<IYearOptionsProps> = ({ onItemSelect, brandId }) => {
  const { axios, axiosInitialized } = useAxios({ apiVersion: 1 });

  const [years, setYears] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!axiosInitialized) return;

    axios
      ?.get(`dealers/vehicles/years`, {
        params: {
          brandId: brandId,
        },
      })
      .then(res => {
        setYears(res.data);
      });
  }, [axios, axiosInitialized, brandId]);

  if (!years || years.length === 0) {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />;
  }

  return (
    <>
      {years.map(x => (
        <div key={x} onClick={() => onItemSelect(x)} className='car-picker-option'>
          {x}
        </div>
      ))}
    </>
  );
};

export default React.memo(YearOptions);
