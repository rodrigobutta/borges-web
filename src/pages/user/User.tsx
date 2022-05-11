import React, { useState, useEffect } from 'react';
import { Card, Button, Input, notification, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxiosV2';
import { Profile } from '../../models/Profile';
// import { SelectDropdownTable } from '../../components/SelectDropdownTable';

export default function UserView() {
  const { uuid } = useParams();

  const { axios } = useAxios();
  const [data, setData] = useState<any>();
  const [saving, setSaving] = useState(false);

  // const [accounts, setAccounts] = useState([]);

  // useEffect(() => {
  // 	async function fetchData() {
  // 		!!axios &&
  // 			axios.get(`account`).then((res) => {
  // 				setAccounts(res.data.rows);
  // 			});
  // 	}
  // 	fetchData();
  // }, [axios]);

  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      !!axios &&
        axios.get(`users/${uuid}`).then(res => {
          setData(res.data);
        });
    }
    fetchData();
  }, [axios, uuid]);

  const openNotification = (message: string) => {
    notification.open({
      message: message,
      icon: <InfoCircleOutlined />,
      duration: 2,
    });
  };

  if (!data) {
    return null;
  }

  const handleFormSubmit = (values: any) => {
    setSaving(true);

    const fixedValues = {
      ...values,
      // accounts: values.accounts.map((a) => parseInt(a)),
    };

    try {
      !!axios &&
        axios.patch(`users/${data.uuid}`, fixedValues).then(res => {
          openNotification(res.data?.message || 'Salvo com sucesso');
          setSaving(false);
        });
    } catch (e) {
      console.error('Error al guardar', e);
      openNotification('Algo deu errado');
      setSaving(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  // since "profiles" is an complex object, the antd Form Item will try to fill it later in the Select initialValues with error, so we need to adapt it before
  // must be an array of STRINGS
  const formInitialValues = {
    ...data,
    accounts: data.profiles ? data.profiles.map(({ accountId }: Profile) => `${accountId}`) : [],
  };

  return (
    <div className={'p-2'}>
      <Card
        title={`Usuario ${data.email || ''}`}
        extra={
          <>
            <Link to={`/users`}>
              <Button className={'mx-1'} disabled={saving}>
                Fechar
              </Button>
            </Link>
          </>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          name='userForm'
          onFinish={handleFormSubmit}
          initialValues={formInitialValues}
          scrollToFirstError
        >
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            name='firstName'
            label='Nome'
            // tooltip="nombre"
            rules={[
              {
                required: true,
                message: 'El nombre es requerido!',
                whitespace: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>

          <Form.Item
            name='lastName'
            label='Sobrenome'
            // tooltip="nombre"
            rules={[
              {
                required: true,
                message: 'El apellido es requerido!',
                whitespace: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>

          {/* <Form.Item name="accounts" label="Cuentas">
						<SelectDropdownTable
							options={accounts}
							optionKey="id"
							optionLabel="name"
							header={{
								name: { value: 'Nombre', col: 2 },
								origin: { value: 'Origen', col: 1 },
							}}
							disabled={saving}
							// defaultValue={formInitialValues.accounts} // no need, inherited from Form.Item
						/>
					</Form.Item> */}

          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit' disabled={saving} loading={saving}>
              {saving ? 'Salvando..' : 'Salvar'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
