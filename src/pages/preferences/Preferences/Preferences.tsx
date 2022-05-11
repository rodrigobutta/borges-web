import React from 'react';

import { Row, Menu, Col, Card } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const Preferences = () => {
  const _navigate = useNavigate();

  const onSelect = React.useCallback((x: any) => _navigate(`/preferences${x.key}`), [_navigate]);

  return (
    <Row>
      <Col span={4}>
        <Card>
          <Menu onSelect={onSelect} defaultSelectedKeys={['/']}>
            <Menu.Item key={'/'}>Geral</Menu.Item>
            <Menu.Item key={'/documents'}>Documentos</Menu.Item>
            <Menu.Item key={'/location'}>Localizações</Menu.Item>
          </Menu>
        </Card>
      </Col>
      <Col span={20} style={{ paddingLeft: 10 }}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default React.memo(Preferences);
