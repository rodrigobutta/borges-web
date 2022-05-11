import React from 'react';

import { Field } from 'formik';

import { Col } from 'antd';

import { Form } from 'components-v2';

import { useAxios } from 'hooks';

import { IUserSelectFieldWrapper, getIsInvalidClassName } from '../.';

const UserSelectFieldWrapper: React.FC<IUserSelectFieldWrapper> = ({
  label,
  labelAlign,
  name,
  disabled,
  error,
  touched,
  spanProportion,
}) => {
  const axios = useAxios();

  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios
      ?.get('users', {
        params: { qt: 'select' },
      })
      .then(({ data }) => {
        setUsers(data);
      });
  }, [axios]);

  if (!spanProportion) return <></>;

  return (
    <Form.Group>
      <Form.Group.Label span={spanProportion[0]} text={label} align={labelAlign} />
      <Col span={spanProportion[1]}>
        <Field name={name}>
          {({ field }: any) => (
            <Form.Select {...field} className={getIsInvalidClassName(error, touched)} disabled={disabled}>
              <option value=''>Selecionar</option>
              {users.map(x => (
                <option key={x.id} value={x.id}>
                  {`${x.firstName} ${x.lastName}`}
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

export default React.memo(UserSelectFieldWrapper);
