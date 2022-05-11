import React from 'react';

import { Row, Col, Button } from 'antd';

import { CloseCircleOutlined, EditFilled, SaveOutlined } from '@ant-design/icons';
import { BackButtonPartial } from '..';

const EditManagementHeader: React.FC<IEditManagementHeaderProps> = ({
  onClickCancelar,
  onClickEditar,
  onClickGuardar,
  showCancelarButton,
  showGuardarButton,
  showEditarButton,
  showBackButton,
}) => {
  return (
    <Row className='edit-management-header'>
      <Col span={24}>
        <div className='back-button--container'>{showBackButton && <BackButtonPartial />}</div>
        <div className='actions-button--container'>
          {showCancelarButton && (
            <Button icon={<CloseCircleOutlined />} type='dashed' onClick={onClickCancelar}>
              Cancelar
            </Button>
          )}
          {showGuardarButton && (
            <Button
              icon={<SaveOutlined />}
              type='dashed'
              onClick={() => {
                if (onClickGuardar) onClickGuardar();
              }}
            >
              Salvar
            </Button>
          )}
          {showEditarButton && (
            <Button icon={<EditFilled />} type='dashed' onClick={onClickEditar}>
              Editar
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

interface IEditManagementHeaderProps {
  onClickCancelar?: () => void;
  onClickGuardar?: () => void;
  onClickEditar?: () => void;
  showCancelarButton?: boolean;
  showGuardarButton?: boolean;
  showEditarButton?: boolean;
  showBackButton?: boolean;
}

export default EditManagementHeader;
