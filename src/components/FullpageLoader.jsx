import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function FullpageLoader({ visible = false, text = 'Carregando...' }) {
  if (!visible) {
    return null;
  }
  return (
    <>
      <div style={style}>
        <Spin size='large' tip={text} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    </>
  );
}

const style = {
  position: 'fixed',
  top: 0,
  height: '100vh',
  width: '100vw',
  left: 0,
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.8)',
};
