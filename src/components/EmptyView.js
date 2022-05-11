import React from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
//import { upperFirst } from "lodash";
import { CarOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';

const { Title } = Typography;

const style = {
  minHeight: 300,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function EmptyView() {
  const auth = useAuth();

  return (
    <div style={{ minHeight: 1000, paddingTop: 150 }}>
      <Row>
        <Col span={12} offset={6}>
          <Title>Bemvindo, {auth && auth.user?.firstName}!</Title>

          <Card>
            <div style={style}>
              <CarOutlined style={{ fontSize: 100, width: 260 }} />
              <h2>Seu estoque ainda não tem veículos</h2>
              <p style={{ maxWidth: '80%' }}>Importar seus veículos rapidamente para ter acesso ao financiamento</p>
              <div style={{ display: 'inline' }}>
                <Link to={`/inventario/adicionar`}>
                  {' '}
                  <Button type={'primary'}>Adicionar um veículo</Button>
                </Link>
                <span>{' o '}</span>
                <Link to={`/bulk`}>
                  {' '}
                  <Button type={'dashed'}>Importar do arquivo</Button>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
