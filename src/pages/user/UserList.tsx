import React, { useState } from 'react';
import moment from 'moment';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card, Table, notification, Col, Row, Tooltip } from 'antd';
import { useList } from '../../hooks/useList';
import { useAxios } from '../../hooks/useAxiosV2';
import FullpageLoader from '../../components/FullpageLoader';
// import UserProfileTags from '../../components/UserProfileTags';
import UserFilters from '../../components/UserFilters';
import PaginationControls from '../../components/PaginationControls';
import UserAddModal from './UserAddModal';

function UserList() {
  const { setPage, state, setQuery, update } = useList({
    url: 'users',
    initialSort: 'id',
    initialQuery: {},
    method: 'GET',
  });
  const { count, page, itemsPerPage, isLoading, query, data } = state;

  const { axios } = useAxios();
  const [processing, setProcessing] = useState<any>(null);
  const [filters, setFilters] = useState([]);

  const location = useLocation();

  const handleDeleteUser = (uuid: string, email: string) => {
    setProcessing('Eliminando usuario..');

    !!axios &&
      axios
        .delete(`users/${uuid}`)
        .then(_res => {
          setProcessing(null);

          const notificationKey = `open${Date.now()}`;

          notification.info({
            message: 'Usuario eliminado',
            description: (
              <>
                <p style={{ marginBottom: '10px' }}>
                  El usuario <strong>{email}</strong> fue eliminado, desea cancelar la operación y reactivarlo?
                </p>
                <Button type='primary' onClick={() => handleRestoreButtonClick(uuid, email, notificationKey)}>
                  Deshacer y Reactivar usuario
                </Button>
              </>
            ),
            placement: 'bottomRight',
            duration: 0,
            key: notificationKey,
          });

          update();
        })
        .catch(err => {
          console.log(err);
          setProcessing(null);
          notification.error({
            message: `Error al eliminar el usuario`,
            description: err.message,
            placement: 'bottomRight',
            duration: 5,
          });
        });
  };

  const handleRestoreButtonClick = (uuid: string, email: string, notificationKey: any) => {
    handleUndoDelete(uuid, email);
    notification.close(notificationKey);
  };

  const handleUndoDelete = (uuid: string, email: string) => {
    setProcessing('Recuperando usuario...');

    !!axios &&
      axios
        .post(`users/${uuid}`)
        .then(_res => {
          setProcessing(null);

          notification.success({
            message: `Usuario ${email} recuperado`,
            description: 'El usuario fue reactvado',
            placement: 'bottomRight',
            duration: 5,
          });

          update();
        })
        .catch(err => {
          console.log(err);
          setProcessing(null);
          notification.error({
            message: `Error al recuperar el usuario`,
            description: err.message,
            placement: 'bottomRight',
            duration: 5,
          });
        });
  };

  // const handleFilterProfileClick = (profile) => {
  // 	if (
  // 		filters.find(
  // 			(f) => f.name === 'accountId' && f.value === profile.accountId
  // 		)
  // 	) {
  // 		return false;
  // 	}

  // 	handleFiltersChange([
  // 		...filters,
  // 		{
  // 			label: 'Cuenta',
  // 			name: 'accountId',
  // 			text: profile.name,
  // 			value: profile.accountId,
  // 		},
  // 	]);
  // };

  const handleFiltersChange = (updatedFilters: any) => {
    const uniqueFilters = updatedFilters.reduce((acc: any, current: any) => {
      const x = acc.find((item: any) => item.name === current.name && item.value === current.value);
      if (x) {
        return acc;
      } else {
        return [...acc, current];
      }
    }, []);

    setFilters(uniqueFilters);

    const filtersMapped = uniqueFilters.reduce(
      (acc: any, f: any) =>
        acc.hasOwnProperty(f.name)
          ? typeof acc[f.name] === 'object'
            ? {
                ...acc,
                [f.name]: [...acc[f.name], f.value],
              }
            : {
                ...acc,
                [f.name]: [acc[f.name], f.value],
              }
          : {
              ...acc,
              [f.name]: f.value,
            },
      {},
    );

    setQuery({
      ...query,
      ...filtersMapped,
    });
  };

  const handlePageClick = (p: any) => setPage(p);

  return (
    <div key={location.key}>
      {processing &&
        processing !== '' &&
        FullpageLoader({
          visible: true,
          text: processing,
        })}

      <div>
        <Card
          title={
            <>
              <Row style={{ marginBottom: '20px' }}>
                <Col span={16}>
                  <span>Usuarios</span>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  {/* <span style={{ float: 'right', marginBottom: '30px' }}> */}
                  <UserAddModal onUserUpdated={update} />
                  {/* </span> */}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <UserFilters filters={filters} onFiltersChange={handleFiltersChange} />
                </Col>
              </Row>
            </>
          }
        >
          <PaginationControls
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageClick={handlePageClick}
            itemsCount={count}
          />

          <Table
            loading={isLoading}
            size={'small'}
            pagination={false}
            style={{ overflowX: 'scroll' }}
            columns={[
              // {
              // 	dataIndex: 'id',
              // 	title: 'UUID',
              // 	render: (_data, item) => (
              // 		<Link to={`/users/${item.uuid}`}>{item.uuid}</Link>
              // 	),
              // },
              {
                title: 'Email',
                dataIndex: 'email',
                render: (value, item) => (
                  <Tooltip title={item.uuid} placement={'left'}>
                    <Link to={`/users/${item.uuid}`}>{value}</Link>
                  </Tooltip>
                ),
              },
              {
                dataIndex: 'name',
                title: 'Nome',
                render: (_data, item) => {
                  return `${item.firstName} ${item.lastName}`;
                },
              },
              // {
              // 	title: 'Perfiles',
              // 	dataIndex: 'profiles',
              // 	render: (_data, item, ix) => (
              // 		<UserProfileTags
              // 			key={ix}
              // 			profiles={item.profiles}
              // 			onClick={handleFilterProfileClick}
              // 		/>
              // 	),
              // },
              {
                title: 'Criado',
                dataIndex: 'createdAt',
                render: value => (
                  <Tooltip title={moment(value).utc().format('YYYY-MM-DD hh:mm')} placement={'left'}>
                    {moment(value).utc().format('YYYY-MM-DD')}
                  </Tooltip>
                ),
              },
              {
                title: 'Ações',
                dataIndex: 'actions',
                sorter: false,
                filtered: false,
                render: (_value, item) => (
                  <>
                    <Link to={`/users/${item.uuid}`}>
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<FormOutlined />}
                        size={'middle'}
                        style={{ marginRight: '10px' }}
                      />
                    </Link>
                    <Button
                      onClick={() => handleDeleteUser(item.uuid, item.email)}
                      type='primary'
                      shape='circle'
                      icon={<DeleteOutlined />}
                      size={'middle'}
                      danger
                    />
                  </>
                ),
              },
            ]}
            className='table-striped-rows'
            rowKey={record => record.uuid}
            bordered
            dataSource={data}
          />
        </Card>
      </div>
    </div>
  );
}

export default UserList;
