import React from 'react';

import FormGroup from './Group';
import FormSelect from './Select';

const Form: IFormFC<IFormProps> = () => {
  return <></>;
};

interface IFormProps {}

type IFormFC<P> = React.FC<P> & {
  Group: typeof FormGroup;
  Select: typeof FormSelect;
};

Form.Group = FormGroup;
Form.Select = FormSelect;

export default Form;
