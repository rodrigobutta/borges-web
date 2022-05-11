import React from 'react';

import { Row, Col, Button } from 'antd';

import { CloseCircleOutlined, EditFilled, SaveOutlined } from '@ant-design/icons';

import StickyHeaderContainer from './Container';
import { BackButtonPartial } from '..';

const EditManagementStickyHeader: IEditManagementStickyHeaderFC<IEditManagementStickyHeaderProps> = ({
  onClickCancelar,
  onClickEditar,
  onClickGuardar,
  additionalButtons,
  disabledEditarButton,
  disabledGuardarButton,
  loading,
}) => {
  const [showCancelarButton, setShowCancelarButton] = React.useState(false);
  const [showGuardarButton, setShowGuardarButton] = React.useState(false);
  const [showEditarButton, setShowEditarButton] = React.useState(true);

  const clickCancelar = React.useCallback(() => {
    setShowCancelarButton(false);
    setShowGuardarButton(false);
    setShowEditarButton(true);

    onClickCancelar && onClickCancelar();
  }, [onClickCancelar]);

  const clickGuardar = React.useCallback(() => {
    setShowCancelarButton(false);
    setShowGuardarButton(false);
    setShowEditarButton(true);

    onClickGuardar && onClickGuardar();
  }, [onClickGuardar]);

  const clickEditar = React.useCallback(() => {
    setShowCancelarButton(true);
    setShowGuardarButton(true);
    setShowEditarButton(false);

    onClickEditar && onClickEditar();
  }, [onClickEditar]);

  return (
    <Row className='edit-management-sticky-header'>
      <Col span={24}>
        <div className='back-button--container'>
          <BackButtonPartial />
        </div>
        <div className='actions-button--container'>
          {additionalButtons && (
            <>
              {additionalButtons}
              <div className='actions-button--v-divider' />
            </>
          )}
          {showCancelarButton && (
            <Button icon={<CloseCircleOutlined />} type='dashed' onClick={clickCancelar}>
              Cancelar
            </Button>
          )}
          {/* // TODO al Guardar actualiza muy rápido y no se aprecia el loading. Guardar debería mostrar loading, aguardar respuesta del back (un async) y recien ahí volver a renderizar Editar */}
          {showGuardarButton && (
            <Button
              icon={<SaveOutlined />}
              type='dashed'
              onClick={clickGuardar}
              loading={loading || false}
              disabled={disabledGuardarButton || false}
            >
              Salvar
            </Button>
          )}
          {/* // TODO quitar loading de Editar después de solucionar Guardar. */}
          {showEditarButton && (
            <Button
              icon={<EditFilled />}
              type='dashed'
              onClick={clickEditar}
              loading={loading || false}
              disabled={disabledEditarButton || false}
            >
              Editar
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

interface IEditManagementStickyHeaderProps {
  onClickCancelar?: () => void;
  onClickGuardar?: () => void;
  onClickEditar?: () => void;
  additionalButtons?: typeof Button[];
  disabledEditarButton?: boolean;
  disabledGuardarButton?: boolean;
  loading?: boolean;
}

type IEditManagementStickyHeaderFC<P> = React.FC<P> & {
  Container: typeof StickyHeaderContainer;
};

EditManagementStickyHeader.Container = StickyHeaderContainer;

export default EditManagementStickyHeader;
