import React from 'react';

import { Field } from 'formik';

import { Col } from 'antd';

import { ISelectFieldWrapper, getIsInvalidClassName } from '.';

import { Form } from 'components-v2';

const SelectFieldWrapper: React.FC<ISelectFieldWrapper> = ({
  label,
  labelAlign,
  name,
  disabled,
  error,
  touched,
  spanProportion,
  options,
}) => {
  if (!spanProportion) return <></>;

  return (
    <Form.Group>
      <Form.Group.Label span={spanProportion[0]} text={label} align={labelAlign} />
      <Col span={spanProportion[1]}>
        <Field name={name}>
          {({ field }: any) => (
            <Form.Select {...field} className={getIsInvalidClassName(error, touched)} disabled={disabled}>
              <option value=''>Selecionar</option>
              {options.map(x => (
                <option key={x.value} value={x.value}>
                  {x.text}
                </option>
              ))}
            </Form.Select>
          )}
        </Field>
        {error && touched && <Form.Group.Help type='error' text={error} />}
      </Col>
    </Form.Group>
  );
};

export default React.memo(SelectFieldWrapper);
