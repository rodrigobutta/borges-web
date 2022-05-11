import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

const BackButton = () => {
  const _navigate = useNavigate();

  const onClick = React.useCallback(() => {
    _navigate(-1);
  }, [_navigate]);

  return (
    <Button icon={<ArrowLeftOutlined />} type='dashed' onClick={onClick}>
      Voltar
    </Button>
  );
};

export default React.memo(BackButton);
