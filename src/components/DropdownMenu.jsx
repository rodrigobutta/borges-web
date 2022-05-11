import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getByKey } from 'utils';
import React from 'react';

function DropdownMenu({ options, onChange, value, label }) {
  let small = <>{label}</>;
  const byKey = getByKey(options, value, 'value');

  return (
    <Dropdown.Button
      overlay={
        <Menu>
          {options.map(x => (
            <Menu.Item onClick={() => onChange(x.value)} key={x.label}>
              {x.label}
            </Menu.Item>
          ))}
        </Menu>
      }
      className={'muted'}
      placement='bottomCenter'
      icon={<DownOutlined />}
    >
      <small>{small} </small>
      {byKey && byKey.label}
    </Dropdown.Button>
  );
}

export default DropdownMenu;
