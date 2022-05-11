import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import { useAxios } from '../hooks';

const UserSelect = () => {
  const axios = useAxios();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      ?.get('users', {
        params: { qt: 'select' },
      })
      .then(res => {
        setData(res.data);
      });
  }, [axios]);

  return (
    <Form.Item name='userId' label='Vendedor'>
      <Select
        size='large'
        placeholder='Vendedor'
        options={data.map(x => ({
          value: x.id,
          label: `${x.firstName} ${x.lastName}`,
        }))}
      />
    </Form.Item>
  );
};

export default React.memo(UserSelect);
