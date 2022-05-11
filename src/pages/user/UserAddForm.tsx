import React, { useState } from 'react';
import { useAxios } from '../../hooks/useAxiosV2';
import { Form, Button, Input, Alert, notification } from 'antd';
// import { SelectDropdownTable } from '../../components/SelectDropdownTable';

export default function UserAddForm({ onClose, onSubmitted }: any) {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [asyncError, setAsyncError] = useState<any>(null);
  const openNotification = (type: string, message: string, description: string) => {
    const placement = 'bottomRight';
    switch (type) {
      case 'success':
        notification.success({
          message,
          description,
          placement,
        });
        break;
      case 'warning':
        notification.warning({
          message,
          description,
          placement,
        });
        break;
      case 'error':
        notification.error({
          message,
          description,
          placement,
        });
        break;
    }
  };

  const { axios } = useAxios();
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

  const handleFormSubmit = async (values: any) => {
    try {
      setSubmitting(true);

      const fixedValues = {
        ...values,
        // accounts: values.accounts
        // 	? values.accounts.map((a) => parseInt(a))
        // 	: [],
      };

      !!axios &&
        axios.post(`users`, fixedValues).then(res => {
          openNotification(
            'success',
            'Usuário Criado',
            'A conta foi criada. Enviado email com as instruções de login.',
          );
          if (onSubmitted && typeof onSubmitted === 'function') onSubmitted(res.data);
          onClose();
          setSubmitting(false);
          setAsyncError(null);
          form.resetFields();
        });
    } catch (err: any) {
      setAsyncError({ message: err.response.data.message });
      setSubmitting(false);
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

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='userForm'
      onFinish={handleFormSubmit}
      initialValues={{}}
      scrollToFirstError
      layout={'vertical'}
    >
      {asyncError && <Alert message={asyncError.message} type='error' />}

      <Form.Item label='E-Mail (usuario)' name='email' rules={[{ required: true }]}>
        <Input disabled={submitting} />
      </Form.Item>

      <Form.Item label='Nome' name='firstName' rules={[{ required: true }]}>
        <Input disabled={submitting} />
      </Form.Item>

      <Form.Item label='Sobrenome' name='lastName' rules={[{ required: true }]}>
        <Input disabled={submitting} />
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
					disabled={submitting}
				/>
			</Form.Item> */}

      <Form.Item style={{ display: 'flex' }}>
        <Button type='primary' htmlType='submit' disabled={submitting} loading={submitting}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
