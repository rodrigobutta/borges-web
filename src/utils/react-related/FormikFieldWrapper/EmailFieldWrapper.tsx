import React from 'react';

import { Field } from 'formik';

import { Col, Input } from 'antd';

import { IEmailFieldWrapper, getIsInvalidClassName } from '.';
import { Form } from 'components-v2';
import Group from 'antd/lib/input/Group';

const EmailFieldWrapper: React.FC<IEmailFieldWrapper> = ({
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
            <Input {...field} className={getIsInvalidClassName(error, touched)} type='email' disabled={disabled} />
          )}
        </Field>
        {error && touched && <Form.Group.Help type='error' text={error} />}
      </Col>
    </Group>
  );
};

export default React.memo(EmailFieldWrapper);
