import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'antd';
import { useEntity } from '../hooks/useEntity';
import FormFieldWrapper from '../components/FormFieldWrapper';
import { useAxios } from '../hooks/useAxiosV2';

const styles = {
  button: {
    width: 'max-content',
    fontSize: 14,
  },
  container: {
    display: 'flex',
    padding: '0 20px 0 20px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginTop: 10,
  },
  form: {
    padding: '0 8px',
  },
  borderMake: (value: any) => {
    if (value) {
      return {
        borderColor: '#FF4D4F',
      };
    }
  },
  error: {
    marginBottom: 0,
    color: '#FF4D4F',
  },
};

const fields = [
  {
    name: 'id',
    label: 'ID',
    type: 'text',
    placeholder: 'Digite o ID',
    disabled: true,
  },
  {
    name: 'firstName',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Insira o nome',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Sobrenome',
    type: 'text',
    placeholder: 'Insira o sobrenome',
  },
  {
    name: 'cpf',
    label: 'CPF',
    type: 'cpf',
    placeholder: 'Digite o CPF',
  },
  {
    name: 'phoneNumber',
    label: 'telefone móvel',
    type: 'phone',
    placeholder: 'Insira o teléfone',
  },
  {
    name: 'phoneNumber2',
    label: 'Teléfono',
    type: 'phone',
    placeholder: 'Insira el teléfone',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Ingrese el email',
  },
  {
    name: 'address',
    label: 'Dirección',
    type: 'text',
    placeholder: 'Insira o endereço',
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function UserOld() {
  const { entityId } = useParams();
  const [editing, setEditing] = useState(false);
  const { state, errors, onChange, handleSubmit } = useEntity({
    entityId,
    endPoint: 'users',
    fields,
    dottedNotation: true,
  });
  const { axios } = useAxios();

  const { entity, submitted, fetching } = state;

  const onSubmit = async () => {
    !!axios &&
      axios.patch(`users/${entityId}`, entity).then(_res => {
        setEditing(false);
      });
  };

  if (fetching) {
    return null;
  }

  const disabledFn = () => !editing;

  return (
    <div className={'p-2'}>
      <Form size={'large'} {...layout} onFinish={handleSubmit(onSubmit)}>
        <Card
          title={
            <div className='grid-header'>
              <h1 style={{ fontSize: 24, marginBottom: '0' }}>USUARIO</h1>
              <div>
                <Link to='/preferences/usuarios'>
                  <Button
                    style={styles.button}
                    // type={"secondary"}
                    className='m-1'
                  >
                    VOLTAR
                  </Button>
                </Link>
                <Button
                  style={styles.button}
                  onClick={() => setEditing(false)}
                  // type={"secondary"}
                  className='m-1'
                  disabled={!editing}
                >
                  CANCELAR
                </Button>
                <Button
                  style={styles.button}
                  onClick={() => handleSubmit(onSubmit)}
                  className='m-1'
                  htmlType={'submit'}
                  type='primary'
                  disabled={!editing}
                >
                  SALVAR
                </Button>
                <Button
                  style={styles.button}
                  onClick={() => setEditing(true)}
                  className='m-1'
                  type='primary'
                  disabled={editing}
                >
                  EDITAR
                </Button>
              </div>
            </div>
          }
        >
          <Row>
            {fields.map(field => {
              return (
                <Col span={12} key={field.name}>
                  <FormFieldWrapper
                    field={field}
                    onChange={onChange}
                    errors={errors}
                    entity={entity}
                    submitted={submitted}
                    disabledFn={field.disabled || disabledFn}
                  />
                </Col>
              );
            })}
          </Row>
        </Card>
      </Form>
    </div>
  );
}
