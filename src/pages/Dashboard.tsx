import React from 'react';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';

export default function Dashboard() {
  const { auth } = useAuth();

  return (
    <>
      <div>
        {auth && (
          <Result
            icon={<SmileOutlined />}
            title={`Hola ${auth.user?.firstName}! Bem vindo a ${auth.profile?.name}`}
            // extra={<Button type="primary">Next</Button>}
          />
        )}
      </div>
    </>
  );
}
