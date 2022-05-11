import { FC } from 'react';

import { Row } from 'antd';

import clsx from 'clsx';

import GroupLabel from './Label';
import GroupHelp from './Help';

const FormGroup: IFormGroupFC<IFormGroupProps> = ({ className, children }) => {
  return <Row className={clsx('aracar-form__group', className)}>{children}</Row>;
};

interface IFormGroupProps {
  className?: string;
  children?: any;
}

type IFormGroupFC<P> = FC<P> & {
  Label: typeof GroupLabel; // add this
  Help: typeof GroupHelp;
};

FormGroup.Label = GroupLabel;
FormGroup.Help = GroupHelp;

export default FormGroup;
