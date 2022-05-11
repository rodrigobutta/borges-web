import React, { FC } from 'react';

import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ModalPicker, { ISubmitModalPickerDto } from './ModalPicker';

const CarPicker: FC<ICarPickerProps> = ({ value, onChange }) => {
  const [showModal, setShowModal] = React.useState(false);

  const onCancelModal = React.useCallback(() => {
    setShowModal(false);
  }, []);

  const onSubmitModal = React.useCallback(
    (dto: ISubmitModalPickerDto) => {
      onChange({
        vehicleConditionId: dto.condition.id,
        vehicleConditionName: dto.condition.name,
        vehicleClasificationId: dto.clasification.id,
        vehicleClasificationName: dto.clasification.name,
        vehicleBrandId: dto.brand.id,
        vehicleBrandName: dto.brand.name,
        vehicleFamilyId: dto.family.id,
        vehicleFamilyName: dto.family.name,
        vehicleModelId: dto.model.id,
        vehicleModelName: dto.model.name,
        vehicleYear: dto.year,
        year: dto.year, // TODO tmp until can remove year field since were using vehicleYear
      });
    },
    [onChange],
  );

  return (
    <>
      <Input.Group compact>
        <Input style={{ width: 'calc(100% - 32px)' }} disabled placeholder={value} />
        <Button icon={<SearchOutlined />} onClick={() => setShowModal(true)} />
      </Input.Group>
      {showModal && <ModalPicker visible={showModal} onCancel={onCancelModal} onSubmit={onSubmitModal} />}
    </>
  );
};

interface ICarPickerProps {
  value: string;
  onChange: any;
}

export default React.memo(CarPicker);
