import React, { FC } from 'react';

import { Col } from 'antd';

import clsx from 'clsx';

interface IFormGroupLabelProps {
  className?: string;
  span?: number;
  text: string;
  align?: 'left' | 'right';
  children?: any;
}

const FormGroupLabel: FC<IFormGroupLabelProps> = ({ className, children, text, align, ...props }) => {
  const alignmentClassName = React.useMemo(() => {
    if (align === 'left') {
      return 'label-left';
    }

    return 'label-right';
  }, [align]);

  return (
    <Col {...props} className={clsx('aracar-form__group__label', alignmentClassName, className)}>
      <label>{text} :</label>
    </Col>
  );
};

export default FormGroupLabel;
