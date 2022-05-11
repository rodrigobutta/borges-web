import React, { FC } from 'react';

import { Modal, Col, Row, Divider, Button } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

import ConditionOptions from './ConditionOptions';
import BrandOptions from './BrandOptions';
import ModelOptions from './ModelOptions';
import FamilyOptions from './FamilyOptions';
import YearOptions from './YearOptions';

interface IModalPickerProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (dto: ISubmitModalPickerDto) => void;
}

interface ICommonPropertyPicker {
  id: string;
  name: string;
}

export interface ISubmitModalPickerDto {
  brand: ICommonPropertyPicker;
  clasification: ICommonPropertyPicker;
  condition: ICommonPropertyPicker;
  family: ICommonPropertyPicker;
  model: ICommonPropertyPicker;
  year: string;
}

const ModalPicker: FC<IModalPickerProps> = ({ visible, onCancel, onSubmit }) => {
  const [brand, setBrand] = React.useState<ICommonPropertyPicker | null>(null);
  const [condition, setCondition] = React.useState<ICommonPropertyPicker | null>(null);
  const [family, setFamily] = React.useState<ICommonPropertyPicker | null>(null);
  const [model, setModel] = React.useState<ICommonPropertyPicker | null>(null);
  const [year, setYear] = React.useState('');

  const lastKeyRef = React.useRef('');

  const onConditionItemSelect = React.useCallback((_condition: ICommonPropertyPicker) => {
    setCondition(_condition);
    lastKeyRef.current = 'condition';

    setBrand(null);
    setYear('');
    setFamily(null);
    setModel(null);
  }, []);

  const onBrandItemSelect = React.useCallback((_brand: ICommonPropertyPicker) => {
    setBrand(_brand);
    lastKeyRef.current = 'brand';

    setYear('');
    setFamily(null);
    setModel(null);
  }, []);

  const onYearItemSelect = React.useCallback((_year: string) => {
    setYear(_year);
    lastKeyRef.current = 'year';

    setFamily(null);
    setModel(null);
  }, []);

  const onFamilyItemSelect = React.useCallback((_family: ICommonPropertyPicker) => {
    setFamily(_family);
    lastKeyRef.current = 'family';

    setModel(null);
  }, []);

  const onModelItemSelect = React.useCallback(
    (_model: ICommonPropertyPicker) => {
      setModel(_model);
      lastKeyRef.current = 'model';

      if (!brand || !condition || !family) {
        return;
      }

      onSubmit({
        brand: brand,
        clasification: {
          // TODO fixed until we have real clasifications
          id: 'AB',
          name: 'Automoviles, utilitarios y comerciales livianos',
        },
        condition: condition,
        family: family,
        model: _model,
        year: year,
      });

      onCancel();
    },
    [onSubmit, brand, year, condition, family, onCancel],
  );

  const [currentTitle, currentBodyToRender] = React.useMemo(() => {
    if (!condition) {
      return ['Selecionar condição', <ConditionOptions onItemSelect={onConditionItemSelect} />];
    }

    const newCar = condition && condition.id === 'new' ? true : false;

    if (!brand) {
      return ['Selecionar marca', <BrandOptions onItemSelect={onBrandItemSelect} newCar={newCar} />];
    }

    if (!year && !newCar) {
      return ['Selecionar ano', <YearOptions onItemSelect={onYearItemSelect} brandId={brand.id} />];
    }

    if (!family) {
      return [
        'Selecionar familia',
        <FamilyOptions onItemSelect={onFamilyItemSelect} newCar={newCar} brandId={brand.id} year={year} />,
      ];
    }

    if (!model) {
      return [
        'Selecionar modelo',
        <ModelOptions
          onItemSelect={onModelItemSelect}
          newCar={newCar}
          brandId={brand.id}
          year={year}
          familyId={family.id}
        />,
        'selectedFamily',
      ];
    }

    return ['', <></>];
  }, [
    condition,
    onConditionItemSelect,
    brand,
    onBrandItemSelect,
    year,
    onYearItemSelect,
    family,
    onFamilyItemSelect,
    model,
    onModelItemSelect,
  ]);

  const onClickBack = React.useCallback(() => {
    if (lastKeyRef.current === 'condition') {
      lastKeyRef.current = '';
      setCondition(null);
      setBrand(null);
      setYear('');
      setFamily(null);
      setModel(null);
    }

    if (lastKeyRef.current === 'brand') {
      lastKeyRef.current = 'condition';
      setBrand(null);
      setYear('');
      setFamily(null);
      setModel(null);
    }

    if (lastKeyRef.current === 'year') {
      lastKeyRef.current = 'brand';
      setYear('');
      setFamily(null);
      setModel(null);
    }

    if (lastKeyRef.current === 'family') {
      lastKeyRef.current = 'year';
      setFamily(null);
      setModel(null);
    }

    if (lastKeyRef.current === 'model') {
      lastKeyRef.current = 'family';
      setModel(null);
    }
  }, []);

  return (
    <Modal title='&nbsp;' onCancel={onCancel} footer={false} visible={visible} className='modal-car-picker'>
      <Row>
        <Col span={24}>
          <Button icon={<ArrowLeftOutlined />} type='dashed' onClick={onClickBack}>
            Voltar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <table>
            <tr>
              <td>Condición</td>
              <td>:</td>
              <td>{condition?.name || '--'}</td>
            </tr>
            <tr>
              <td>Marca</td>
              <td>:</td>
              <td>{brand?.name || '--'}</td>
            </tr>
          </table>
        </Col>
        <Col span={12}>
          <table>
            <tr>
              <td>Ano</td>
              <td>:</td>
              <td>{year || '--'}</td>
            </tr>
            <tr>
              <td>Familia</td>
              <td>:</td>
              <td>{family?.name || '--'}</td>
            </tr>
          </table>
        </Col>
      </Row>
      <Divider />
      <Row className='options-title'>
        <Col span={24}>
          <h3>{currentTitle}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={24}>{currentBodyToRender}</Col>
      </Row>
    </Modal>
  );
};

export default React.memo(ModalPicker);
