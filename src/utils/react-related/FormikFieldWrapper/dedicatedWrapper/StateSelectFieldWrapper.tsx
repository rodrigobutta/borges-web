import React from 'react';

import { Field } from 'formik';

import { Col } from 'antd';

import { Form } from 'components-v2';

import { useAxios } from 'hooks';
import Group from 'antd/lib/input/Group';
import { IStateSelectFieldWrapper, getIsInvalidClassName } from '../.';

const StateSelectFieldWrapper: React.FC<IStateSelectFieldWrapper> = ({
  label,
  labelAlign,
  name,
  disabled,
  error,
  touched,
  spanProportion,
}) => {
  const axios = useAxios();

  const [states, setStates] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios
      ?.get('state-gravamens', {
        params: { qt: 'select' },
      })
      .then(({ data }) => {
        setStates(data);
      });
  }, [axios]);

  if (!spanProportion) return <></>;

  return (
    <Group>
      <Form.Group.Label span={spanProportion[0]} text={label} align={labelAlign} />
      <Col span={spanProportion[1]}>
        <Field name={name}>
          {({ field }: any) => (
            <Form.Select {...field} className={getIsInvalidClassName(error, touched)} disabled={disabled}>
              <option value=''>Selecionar</option>
              {states.map(x => (
                <option key={x.stateCode} value={x.stateCode}>
                  {x.stateName}
                </option>
              ))}
            </Form.Select>
          )}
        </Field>
        {error && touched && <Form.Group.Help type='error' text={error} />}
      </Col>
    </Group>
  );
};

export default React.memo(StateSelectFieldWrapper);
