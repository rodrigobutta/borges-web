import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import UserAddForm from './UserAddForm';

export default function UserAddModal({ onUserUpdated }: any) {
  const [visible, setVisible] = useState(false);

  const handleClose = () => setVisible(false);

  const handleUserSubmitted = (data: any) => {
    if (onUserUpdated && typeof onUserUpdated === 'function') onUserUpdated(data);
  };

  return (
    <div>
      <div>
        <Button type='primary' onClick={() => setVisible(true)}>
          <UserAddOutlined />
          Novo
        </Button>
      </div>
      <Modal visible={visible} title='Incluir Usuário' footer={null} onCancel={handleClose}>
        <UserAddForm onClose={handleClose} onSubmitted={handleUserSubmitted} />
      </Modal>
    </div>
  );
}
