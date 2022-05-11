import React, { ChangeEvent } from 'react';

import { Field } from 'formik';

import { Col } from 'antd';

import { ICellphoneFieldWrapper, getIsInvalidClassName } from '../.';
import { Form } from 'components-v2';
import { MaskedInput } from 'antd-mask-input';

// TODO: Pass regex replacements functions to index
const CellphoneFieldWrapper: React.FC<ICellphoneFieldWrapper> = ({
  label,
  labelAlign,
  name,
  disabled,
  error,
  touched,
  spanProportion,
  setFieldValue,
}) => {
  const removeMask = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const result = value ? value.replace(/[^0-9]/g, '') : null;

      setFieldValue && setFieldValue(name, result);
    },
    [setFieldValue, name],
  );

  if (!spanProportion) return <></>;

  return (
    <Form.Group>
      <Form.Group.Label span={spanProportion[0]} text={label} align={labelAlign} />
      <Col span={spanProportion[1]}>
        <Field name={name}>
          {({ field }: any) => {
            return (
              <MaskedInput
                name={field.name}
                onBlur={field.onBlur}
                value={field.value}
                mask='+55 (11) 11111-1111'
                disabled={disabled}
                className={getIsInvalidClassName(error, touched)}
                autoComplete='off'
                onChange={e => {
                  removeMask(e);
                }}
              />
            );
          }}
        </Field>
        {error && touched && <Form.Group.Help type='error' text={error} />}
      </Col>
    </Form.Group>
  );
};

export default React.memo(CellphoneFieldWrapper);
