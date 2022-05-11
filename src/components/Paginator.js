import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';
import * as PropTypes from 'prop-types';

function Paginator({ current, onChange, total, pageSize }) {
  if (!(total > 0)) return null;

  return (
    <div className={'p-1'}>
      <span className={'ml-2 mr-2'}>{`${(current - 1) * pageSize + 1}-${Math.min(
        pageSize * current,
        total,
      )} de ${total} registros`}</span>
      <Button
        type='secondary'
        disabled={current === 1}
        icon={<LeftOutlined />}
        size={'small'}
        onClick={() => onChange(Math.max(current - 1, 1))}
      />
      <Button
        type='secondary'
        disabled={current * pageSize > total}
        icon={<RightOutlined />}
        size={'small'}
        onClick={() => onChange(current + 1)}
      />
    </div>
  );
}

Paginator.propTypes = {
  current: PropTypes.any,
  total: PropTypes.any,
  onChange: PropTypes.func,
};

export default Paginator;
