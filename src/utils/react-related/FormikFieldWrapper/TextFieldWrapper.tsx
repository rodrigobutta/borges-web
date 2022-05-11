import React from 'react';

import { Field } from 'formik';

import { Col, Input } from 'antd';

import { ITextFieldWrapper, getIsInvalidClassName } from '.';
import { Form } from 'components-v2';
import Group from 'antd/lib/input/Group';

const TextFieldWrapper: React.FC<ITextFieldWrapper> = ({
  label,
  labelAlign,
  name,
  disabled,
  error,
  touched,
  spanProportion,
}) => {
  if (!spanProportion) return <></>;

  return (
    <Group>
      <Form.Group.Label span={spanProportion[0]} text={label} align={labelAlign} />
      <Col span={spanProportion[1]}>
        <Field name={name}>
          {({ field }: any) => (
            <Input {...field} className={getIsInvalidClassName(error, touched)} type='text' disabled={disabled} />
          )}
        </Field>
        {error && touched && <Form.Group.Help type='error' text={error} />}
      </Col>
    </Group>
  );
};

export default React.memo(TextFieldWrapper);
