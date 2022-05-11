import React from 'react';

import { Row, Col, Button } from 'antd';

import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';

const CreateManagementHeader: React.FC<ICreateManagementHeaderProps> = ({
  onClickCancelar,
  onClickGuardar,
  showCancelarButton,
  showGuardarButton,
}) => {
  return (
    <Row className='create-management-header'>
      <Col span={24}>
        <div className='back-button--container'></div>
        <div className='actions-button--container'>
          {showCancelarButton && (
            <Button icon={<CloseCircleOutlined />} type='dashed' onClick={onClickCancelar}>
              Cancelar
            </Button>
          )}
          {showGuardarButton && (
            <Button icon={<SaveOutlined />} type='dashed' onClick={onClickGuardar}>
              Salvar
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

interface ICreateManagementHeaderProps {
  onClickCancelar?: () => void;
  onClickGuardar?: () => void;
  showCancelarButton?: boolean;
  showGuardarButton?: boolean;
}

export default CreateManagementHeader;
